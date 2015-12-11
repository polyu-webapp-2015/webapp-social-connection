<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 1:28 PM
 * //TODO put this instance on cached variables (among different session) for performance
 */
class DatabaseHelper
{
    const __field_name = "field_name";
    const __field_type = "Type";
    const __enum_value_array = "enum_value_array";
    const __filename = "filename";
    const __code = "code";
    const _field_directory = "database/table_field";
    const _enum_directory = "database/enum";
    const _prepared_statement_directory = "database/prepared_statement";
    const _javascript_directory = "../../public/js/enum";
    const _typescript_directory = "../../public/ts/stub";

    /** @var PDO $connection */
    public static $_pdo;

    public static function check_connection()
    {
        if (self::$_pdo == null)
            self::connect();
    }

    public static function connect()
    {
        /* PDO approach */
        try {
            $dsn = 'mysql:dbname=' . Config::$_ini[Config::__database_name] . ';host=' . Config::$_ini[Config::__database_host];
            $username = Config::$_ini[Config::__database_user];
            $password = Config::$_ini[Config::__database_password];
            $connection = new PDO($dsn, $username, $password);
            self::$_pdo = $connection;
        } catch (PDOException $exception) {
            $msg = "Failed to connect to Database";
            $result_code = ResultCodeEnum::_Failed_To_Connect_To_Database;
            throw new Exception($msg, $result_code, $exception);
        }
    }

    /** @deprecated */
    public static function disconnect()
    {
        self::$_pdo = null;
    }

    public static function quote($string)
    {
        self::check_connection();
        return self::$_pdo->quote($string);
    }

    /**
     * @param $prepared_statement
     * @return PDOStatement
     */
    public static function prepare($prepared_statement)
    {
        self::check_connection();
        return self::$_pdo->prepare($prepared_statement);
    }

    /**
     * @param PDOStatement $statement
     * @param array $param_array
     * @param bool $skip_cleaning
     * @return mixed
     * @throws Exception
     */
    public static function execute($statement, array $param_array = null, $skip_cleaning = false)
    {
        if ($param_array == null)
            $result = $statement->execute();
        else
            $result = $statement->execute($param_array);
        if ($result) {
            $rows = $statement->fetchAll();
            if (!$skip_cleaning)
                $rows = self::clean_result($rows);
            return $rows;
        } else {
            $msg = ErrorResponse::generate_pdo_error_msg("Failed to execute prepared statement");
            throw new Exception($msg, ResultCodeEnum::_Failed_To_Query_On_Database);
        }
    }

    public static function get_prepare_and_execute($prepared_statement_filename, array $param_array = null, $skip_cleaning = false)
    {
        $sql = self::get_prepared_statement($prepared_statement_filename);
        return self::prepare_and_execute($sql, $param_array, $skip_cleaning);
    }

    public static function prepare_and_execute($prepared_statement, array $param_array = null, $skip_cleaning = false)
    {
        $statement = self::prepare($prepared_statement);
        return self::execute($statement, $param_array, $skip_cleaning);
    }

    /**
     * filter the number in result (only preserve the string key fields)
     * @param array $row_array
     * @return array
     */
    public static function clean_result(array $row_array)
    {
        return array_map(function ($row) {
            return array_filter_by_function($row, function ($key, $value) {
                return !is_numeric($key);
            });
        }, $row_array);
    }

    public static function get_table_name_array()
    {
        self::check_connection();
        $sql = "show tables;";
        $result = self::query($sql, true);
        $table_array = [];
        foreach ($result as $row) {
            $table_array[] = $row[0];
        }
        return $table_array;
    }

    /**
     * @param $sql
     * @param bool|false $skip_clean
     * @return array
     * @throws Exception
     */
    public static function query($sql, $skip_clean = false)
    {
        if (Config::$_ini[Config::__full_debug_on_database]) {
            log_object("-------query------");
            log_object($sql);
        }
        self::check_connection();
        $result = self::$_pdo->query($sql);
        if ($result == false) {
            $code = ResultCodeEnum::_Failed_To_Query_On_Database;
            $msg = json_encode(self::$_pdo->errorInfo());
            throw new Exception($msg, $code);
        }
        $row_array = [];
        foreach ($result as $row) {
            $row_array[] = $row;
        }
        if (!$skip_clean)
            $row_array = self::clean_result($row_array);
        return $row_array;
    }

    const __AND = " AND ";
    const __OR = " OR ";

    /** @deprecated unsafe */
    public static function field_value_to_statement(array $field_value)
    {
        assert(count($field_value) == 1, "This operation only support one key value pair");
        return array_keys($field_value)[0] . " = " . array_values($field_value)[0];
    }

    /** @deprecated unsafe */
    public static function field_value_to_not_statement(array $field_value)
    {
        assert(count($field_value) == 1, "This operation only support one key value pair");
        return array_keys($field_value)[0] . " != " . array_values($field_value)[0];
    }

    /** @deprecated unsafe */
    public static function logical_statement_join(array &$collection, $logic_operation, array $field_value)
    {
        assert($logic_operation == self::__AND || $logic_operation == self::__OR, "Invalid logic operation");
        $array_values = array_values($field_value);
        if (count($field_value) > 1) {
            foreach ($field_value as $field => $value)
                self::logical_statement_join($collection, $logic_operation, [$field => $value]);
        } elseif (is_array($array_values[0])) {
            foreach ($array_values as $value)
                self::logical_statement_join($collection, $logic_operation, $value);
        } else {
            $current_statement = self::field_value_to_statement($field_value);
            if (count($collection) == 0) {
//                assert($logic_operation == self::__AND, "Invalid logic operation on empty collection");
                $collection[] = $current_statement;
            } else
                $collection[] = $logic_operation . $current_statement;
        }
    }

    public static function logical_statement_collection_to_where_statement(array $collection)
    {
        return "WHERE " . implode('', $collection);
    }

    public static function where_statement_join_OR(array $where_statement_array)
    {
        return self::where_statement_join_generic($where_statement_array, self::__OR);
    }

    public static function where_statement_join_AND(array $where_statement_array)
    {
        return self::where_statement_join_generic($where_statement_array, self::__AND);
    }

    public static function where_statement_join_generic(array $field_value_array, $conjunction)
    {
        $where_options = [];
        self::logical_statement_join($where_options, $conjunction, $field_value_array);
        return self::logical_statement_collection_to_where_statement($where_options);
    }

    /** @deprecated unsafe
     * @param $table_name
     * @param array $select_array
     * @param string $where_statement
     * @param bool $skip_clean
     * @return array
     * @throws Exception
     */
    public static function select_from_table($table_name, array $select_array = [], $where_statement = "", $skip_clean = false)
    {
        $N_select = count($select_array);
        if ($N_select == 0)
            $select_statement = "*";
        else {
//            $select_statement = $select_array[0];
//            for ($i = 1; $i < $N_select; $i++) {
//                $select_statement = "$select_statement,{$select_array[$i]}";
//            }
            $select_statement = implode(',', $select_array);
        }
        $sql = "SELECT $select_statement from $table_name $where_statement ;";
        return self::query($sql, $skip_clean);
    }

    public static function update_on_table($table_name, array $set_field_value_array = [], $where_statement)
    {
        $set_statement_array = array_map(function ($set_field_value) {
            $field = array_keys($set_field_value)[0];
            return "$field = :$field";
        }, $set_field_value_array);
        $set_statement = implode(',', $set_statement_array);
        $sql = "UPDATE $table_name SET $set_statement WHERE $where_statement ;";
        $statement = self::prepare($sql);
        foreach ($set_field_value_array as $set_field_value) {
            $field = array_keys($set_field_value)[0];
            $value = array_values($set_field_value)[0];
            $statement->bindValue(":$field", $value);
        }
        if ($statement->execute()) {
            return $statement->fetchAll();
        } else {
            log_object_from_named("Failed to update table", "DatabaseHelper::update_on_table");
            log_object_from_named($set_field_value_array, "set field value array");
            log_object_from_named($statement->queryString, "queryString");
            $msg = ErrorResponse::generate_pdo_error_msg("Failed to update on table");
            throw new Exception($msg, ResultCodeEnum::_Failed_To_Update_On_Database);
        }
    }

    public static function select_all_from_table($table_name, $skip_clean = false)
    {
        $sql = "SELECT * FROM $table_name;";
        $result = self::query($sql, $skip_clean);
        return $result;
    }

    public static function get_table_field_array($table_name)
    {
        self::check_connection();
        $sql = "DESCRIBE $table_name;";
        $result = self::query($sql, true);
        $field_array = [];
        foreach ($result as $row) {
            $field = [self::__field_name => $row[0]];
            if (preg_match("/^enum\((.*)\)$/", $row[1], $matches) == 1)
                $field[self::__enum_value_array] = str_replace("'", "", explode(',', $matches[1]));
            $field[self::__field_type] = $row[self::__field_type];
            $field_array[] = $field;
        }
        return $field_array;
    }

    public static function table_insert($table_name, array $field_value_array)
    {
        $field_names = implode(', ', array_keys($field_value_array));
        $field_values = ':' . implode(', :', array_keys($field_value_array));
        $sql = "INSERT INTO $table_name ($field_names) VALUES ($field_values)";
        $statement = self::prepare($sql);
        foreach ($field_value_array as $field_name => $field_value) {
            $statement->bindValue(":$field_name", $field_value);
        }
        $result = $statement->execute();
        if ($result == false) {
            $msg = ErrorResponse::generate_pdo_error_msg("Failed to insert into table $table_name!", $statement);
            throw new Exception($msg, ResultCodeEnum::_Failed_To_Insert_On_Database);
        }
        return $statement->fetchAll();
    }

    public static function generate_table_name_enum_javascript($table_name_array)
    {
        $enum_name = "TableName";
        $file_name = $enum_name . "Enum.js";
        $code = "/** @remark this is auto-generated file, do not edit\n * generated by php script\n * */";
        $code = "$code\n" . "var $enum_name" . "Enum = function (){";
        foreach ($table_name_array as $enum_value) {
//            log_object_from_named($enum_value, "enum value");
            $code = $code . "\n    this.$enum_value = \"$enum_value\" ;";
        }
        $code = "$code\n};";
        $code = "$code\n" . "var $enum_name = new $enum_name" . "Enum();";
//        log_object_from_named($code, "code");
//        log_object_from_named($file_name, "filename");
        return [
            self::__filename => $file_name,
            self::__code => $code
        ];
    }

    public static function generate_table_stub_php($table_name, array $field_array)
    {
        $file_name = $table_name . "_Field.php";
        $code = "<?php";
        $code = "$code\n/** @remark this is auto-generated file, do not edit\n * generated by php script\n * */";
        $code = "$code\n" . "class $table_name" . "_Fields {";
        $code = $code . "\n    const _ = \"$table_name\" ;";
        $code = $code . "\n    const _insert_sql = \"" . self::_prepared_statement_directory . "/$table_name" . "_insert.sql\" ;";
        foreach ($field_array as $field) {
            $field_name = $field[self::__field_name];
            $code = $code . "\n    const __$field_name = \"$field_name\" ;";
        }
        $code = "$code\n}";
        return [
            self::__filename => $file_name,
            self::__code => $code
        ];
    }

    public static function generate_table_stub_typescript($table_name, array $field_array)
    {
        //TODO
        $file_name = $table_name . ".ts";
        $code = "/** @remark this is auto-generated file, do not edit\n * generated by php script\n * */";
        /* generate stub */
        $code = "$code\n" . "declare function get_all_row(\$http: any, table_name: string) : any[];";
        $code = "$code\n" . "class $table_name" . "_stub {";
        $code = $code . "\n    public static table_name:string = \"$table_name\" ;";
        $code = $code . "\n";
        foreach ($field_array as $field) {
            $field_name = $field[self::__field_name];
            $code = $code . "\n    public static __$field_name:string = \"$field_name\";";
        }
        $code = $code . "\n";
        $code = $code . "\n    private static getObject(\$http) {";
        $code = $code . "\n        get_all_row(\$http,this.table_name)";
        $code = $code . "\n    }";
        $code = $code . "\n";
        $code = $code . "\n    private static parseObject(rawObject:any):$table_name {";
        $code = $code . "\n        //TODO";
        $code = $code . "\n        var my$table_name = new $table_name();";
        foreach ($field_array as $field) {
            $field_name = $field[self::__field_name];
            $code = $code . "\n        my$table_name.$field_name = rawObject.$field_name;";
        }
        $code = $code . "\n        return my$table_name;";
        $code = $code . "\n    }";
        $code = $code . "\n";
        $code = $code . "\n    public static get_all_instance(\$http):$table_name"."[] {";
        $code = $code . "\n        var all_row = get_all_row(\$http,this.table_name);";
        $code = $code . "\n        return all_row.map(row => this.parseObject(row));";
        $code = $code . "\n    }";
        $code = $code . "\n";
        $code = "$code\n}";
        /* generate model */
        $code = "$code\n" . "class $table_name" . " {";
        $code = $code . "\n    public static table_name:string = \"$table_name\" ;";
//        $code = $code . "\n";
//        foreach ($field_array as $field) {
//            $field_name = $field[self::__field_name];
//            $field_type = $field[self::__field_type];
//            $code = $code . "\n    public static __$field_name:string = \"$field_name\";";
//        }
        $code = $code . "\n";
        foreach ($field_array as $field) {
            $field_name = $field[self::__field_name];
            $field_type = self::db_type_to_typescript_type($field[self::__field_type]);
//            log_object_from_named($field_type, $field_name);
            $code = $code . "\n    public $field_name:$field_type;";
        }
        $code = "$code\n}";
        return [
            self::__filename => $file_name,
            self::__code => $code
        ];
    }

    /**
     * @param string $db_type
     * @return string
     */
    public static function db_type_to_typescript_type($db_type)
    {
        if (preg_match("/^char/", $db_type))
            $dest_type = "string";
        elseif (preg_match("/^int/", $db_type))
            $dest_type = "number";
        elseif (preg_match("/^enum/", $db_type))
            $dest_type = "string";
        elseif (preg_match("/^varchar/", $db_type))
            $dest_type = "string";
        elseif ($db_type == "datetime")
            $dest_type = "string";
        elseif ($db_type == "text")
            $dest_type = "string";
        else {
            log_object_from_named($db_type, "non-supported db_type");
            $dest_type = "any";
        };
        /** @var string $dest_type */
        return $dest_type;
    }

    public static function generate_enum_stub_array(array $field_array)
    {
        $enum_stub_array = [];
        foreach ($field_array as $field) {
            if (array_key_exists(self::__enum_value_array, $field)) {
                $enum_name = $field[self::__field_name];
                $file_name = $enum_name . "_Enum.php";
                $code = "<?php";
                $code = "$code\n/** @remark this is auto-generated file, do not edit\n * generated by php script\n * */";
                $code = "$code\n" . "class $enum_name" . "_Enum {";
                foreach ($field[self::__enum_value_array] as $enum_value) {
                    $code = $code . "\n    const __$enum_value = \"$enum_value\" ;";
                }
                $code = $code . "\n}";
                $enum_stub_array[] =
                    [
                        self::__filename => $file_name,
                        self::__code => $code
                    ];
            }
        }
        return $enum_stub_array;
    }

    public static function generate_enum_javascript_array(array $field_array)
    {
        $enum_stub_array = [];
        foreach ($field_array as $field) {
            if (array_key_exists(self::__enum_value_array, $field)) {
                $enum_name = $field[self::__field_name];
                $file_name = $enum_name . "_Enum.js";
                $code = "/** @remark this is auto-generated file, do not edit\n * generated by php script\n * */";
                $code = "$code\n" . "var $enum_name" . "_Enum = function (){";
                foreach ($field[self::__enum_value_array] as $enum_value) {
                    $code = $code . "\n    this.$enum_value = \"$enum_value\" ;";
                }
                $code = "$code\n};";
                $code = "$code\n" . "var $enum_name = new $enum_name" . "_Enum();";
                $enum_stub_array[] =
                    [
                        self::__filename => $file_name,
                        self::__code => $code
                    ];
            }
        }
        return $enum_stub_array;
    }

//    const backtick = "`";
    const backtick = "";

    public static function generate_prepared_statement($table_name, array $field_array)
    {
        $bt = self::backtick;
        $file_name = $table_name . "_insert.sql";
        $code = "INSERT INTO $bt" . $table_name . "$bt (";
        $code = $code . "$bt" . $field_array[0][self::__field_name] . "$bt";
        $N_field = count($field_array);
        for ($i = 1; $i < $N_field; $i++) {
            $code = $code . ", " . $bt . $field_array[$i][self::__field_name . $bt];
        }
        $code = $code . ") VALUES (:" . $field_array[0][self::__field_name];
        for ($i = 1; $i < $N_field; $i++) {
            $code = $code . ", :" . $field_array[$i][self::__field_name];
        }
        $code = $code . ");";
        return [
            self::__filename => $file_name,
            self::__code => $code
        ];
    }

    public static function write_class_array_to_directory($directory, $class_array)
    {
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }
        $package_code = "<?php\n/** @remark this is auto-generated file, do not edit\n * generated by php script\n * */";
        foreach ($class_array as $class) {
            $filename = $class[self::__filename];
            $code = $class[self::__code];
            echo "... $filename<br>";
            file_put_contents($directory . "/" . $filename, $code);
            $package_code = $package_code . "\n" . "include_once '$filename';";
        }
        $filename = "package.php";
        echo "... $filename<br>";
        file_put_contents($directory . "/" . $filename, $package_code);
        echo "<br> written to $directory/ <hr>";
    }

    public static function write_script_array_to_directory($directory, $script_array)
    {
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }
        foreach ($script_array as $script) {
            $filename = $script[self::__filename];
            $code = $script[self::__code];
            echo "... $filename<br>";
            file_put_contents($directory . "/" . $filename, $code);
        }
        echo "<br> written to $directory/ <hr>";
    }

    public static function generate_all_table_stub()
    {
        $table_class_php_array = [];
        $table_class_typescript_array = [];
        $enum_class_array = [];
        $tables = self::get_table_name_array();
        $table_name_enum_javascript = self::generate_table_name_enum_javascript($tables);
        $prepared_statement_array = [];
        $enum_javascript_array = [];
        foreach ($tables as $table) {
            $field_array = self::get_table_field_array($table);
            $table_class_php_array[] = self::generate_table_stub_php($table, $field_array);
            $table_class_typescript_array[] = self::generate_table_stub_typescript($table, $field_array);
            $enum_class_array[] = self::generate_enum_stub_array($field_array);
            $prepared_statement_array[] = self::generate_prepared_statement($table, $field_array);
            $enum_javascript_array[] = self::generate_enum_javascript_array($field_array);
        }
        $enum_class_array = array_flatten($enum_class_array);
        $enum_javascript_array = array_flatten($enum_javascript_array);
        /* save field classes */
        self::write_class_array_to_directory(self::_field_directory, $table_class_php_array);
        /* save enum classes */
        self::write_class_array_to_directory(self::_enum_directory, $enum_class_array);
        /* save insert prepared statement */
        self::write_script_array_to_directory(self::_prepared_statement_directory, $prepared_statement_array);
        /* save javascript enum */
        /* add the table name enum into enum array */
        $enum_javascript_array[] = $table_name_enum_javascript;
        self::write_script_array_to_directory(self::_javascript_directory, $enum_javascript_array);
        /* save typescript enum */
        self::write_script_array_to_directory(self::_typescript_directory, $table_class_typescript_array);
    }

    public static function get_prepared_statement($filename)
    {
        $path = self::_prepared_statement_directory . '/' . $filename;
        $content = file_get_contents($path);
        if ($content == false)
            throw new Exception("Failed to load prepared statement sql script", ResultCodeEnum::_Server_File_Missing);
        return $content;
    }
}
