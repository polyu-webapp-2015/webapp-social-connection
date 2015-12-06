<?php
//require_once '../config.php';

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 1:28 PM
 */
class DatabaseHelper
{
    const __field_name = "field_name";
    const __enum_value_array = "enum_value_array";
    const __filename = "filename";
    const __code = "code";
    const _field_directory = "database/table_field";
    const _enum_directory = "database/enum";
    const _prepared_statement_directory = "database/prepared_statement";

    public static $_connection;

    public static function check_connection()
    {
        if (self::$_connection == null)
            self::connect();
    }

    public static function connect()
    {
        try {
            global $_config;
            $ini = $_config->ini;
            $host = $ini[Config::__database_host];
            $username = $ini[Config::__database_user];
            $password = $ini[Config::__database_password];
            $database_name = $ini[Config::__database_name];
            $port = $ini[Config::__database_port];
            $connection = new mysqli($host, $username, $password, $database_name, $port);
            if ($connection->connect_error) {
                ErrorResponse::response(ResultCodeEnum::_Failed_To_Connect_To_Database, $connection->connect_error);
            }
            self::$_connection = $connection;
        } catch (mysqli_sql_exception $exception) {
            throw new Exception($exception->getMessage(), ResultCodeEnum::_Failed_To_Connect_To_Database, $exception);
        }
    }

    public static function prepare($prepared_statement)
    {
        self::check_connection();
        return self::$_connection->prepare($prepared_statement);
    }

    public static function get_table_name_array()
    {
        self::check_connection();
        $sql = "show tables;";
        $result = mysqli_query(self::$_connection, $sql);
        $table_array = [];
        while ($row = mysqli_fetch_array($result)) {
            $table_array[] = $row[0];
        }
        return $table_array;
    }

    public static function query($sql)
    {
        self::check_connection();
        $result = mysqli_query(self::$_connection, $sql);
        $result_array = [];
        while ($row = mysqli_fetch_array($result)) {
            $result_array[] = $row;
        }
        return $result_array;
    }

    public static function where_statement_join_OR(array $where_statement_array)
    {
        return self::where_statement_join_generic($where_statement_array, "OR");
    }

    public static function where_statement_join_AND(array $where_statement_array)
    {
        return self::where_statement_join_generic($where_statement_array, "AND");
    }

    public static function where_statement_join_generic(array $field_value_array, $conjunction)
    {
        $combined_statement_array = [];
        foreach ($field_value_array as $field_value) {
            $combined_statement_array[] = $field_value[0] . " = " . $field_value[1];
        }
        $N_combined_statement = count($combined_statement_array);
        if ($N_combined_statement == 0)
            $where_statement = "";
        else {
            $where_statement = "WHERE " . $combined_statement_array[0];
            for ($i = 1; $i < $N_combined_statement; $i++) {
                $where_statement = $where_statement . " $conjunction " . $combined_statement_array[$i];
            }
        }
        return $where_statement;
    }

    public static function select_from_table($table_name, array $select_array = [], $where_statement = "")
    {
        $N_select = count($select_array);
        if ($N_select == 0)
            $select_statement = "*";
        else {
            $select_statement = $select_array[0];
            for ($i = 1; $i < $N_select; $i++) {
                $select_statement = "$select_statement,{$select_array[$i]}";
            }
        }
        $sql = "SELECT $select_statement from $table_name $where_statement ;";
        return self::query($sql);
    }

    public static function get_table_field_array($table_name)
    {
        self::check_connection();
        $sql = "DESCRIBE $table_name;";
        $result = mysqli_query(self::$_connection, $sql);
        $field_array = [];
        while ($row = mysqli_fetch_array($result)) {
            $field = [self::__field_name => $row[0]];
            if (preg_match("/^enum\((.*)\)$/", $row[1], $matches) == 1)
                $field[self::__enum_value_array] = str_replace("'", "", explode(',', $matches[1]));
            $field_array[] = $field;
        }
        return $field_array;
    }

    public static function generate_table_stub($table_name, array $field_array)
    {
        $file_name = $table_name . "_Field.php";
        $code = "<?php\n" . "class $table_name" . "_Fields {";
        $code = $code . "\n    const _ = \"$table_name\" ;";
        $code = $code . "\n    const _insert_sql = \"".self::_prepared_statement_directory."/$table_name"."_insert.sql\" ;";
        foreach ($field_array as $field) {
            $field_name = $field[self::__field_name];
            $code = $code . "\n    const __$field_name = \"$field_name\" ;";
        }
        $code = $code . "\n}";
        return [
            self::__filename => $file_name,
            self::__code => $code
        ];
    }

    public static function generate_enum_stub_array(array $field_array)
    {
        $enum_stub_array = [];
        foreach ($field_array as $field) {
            if (array_key_exists(self::__enum_value_array, $field)) {
                $enum_name = $field[self::__field_name];
                $file_name = $enum_name . "_Enum.php";
                $code = "<?php\n" . "class $enum_name" . "_Enum {";
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

//    const backtick = "`";
    const backtick = "";

//    const backtick = "";

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
        $code = $code . ") VALUES (?";
        for ($i = 1; $i < $N_field; $i++) {
            $code = $code . ",?";
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
        $package_code = "<?php";
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

    public static function write_sql_array_to_directory($directory, $sql_array)
    {
        if (!file_exists($directory)) {
            mkdir($directory, 0755, true);
        }
        foreach ($sql_array as $class) {
            $filename = $class[self::__filename];
            $code = $class[self::__code];
            echo "... $filename<br>";
            file_put_contents($directory . "/" . $filename, $code);
        }
        echo "<br> written to $directory/ <hr>";
    }

    public static function generate_all_table_stub()
    {
        $field_class_array = [];
        $enum_class_array = [];
        $tables = self::get_table_name_array();
        $prepared_statement_array = [];
        foreach ($tables as $table) {
            $field_array = self::get_table_field_array($table);
            $field_class_array[] = self::generate_table_stub($table, $field_array);
            $enum_class_array[] = self::generate_enum_stub_array($field_array);
            $prepared_statement_array[] = self::generate_prepared_statement($table, $field_array);
        }
        $enum_class_array = array_flatten($enum_class_array);
        /* generate field classes */
        self::write_class_array_to_directory(self::_field_directory, $field_class_array);
        /* generate enum classes */
        self::write_class_array_to_directory(self::_enum_directory, $enum_class_array);
        /* generate insert prepared statement */
        self::write_sql_array_to_directory(self::_prepared_statement_directory, $prepared_statement_array);
    }

    public static function default_action()
    {
        log_object("default action");
        self::generate_all_table_stub();
    }
}
