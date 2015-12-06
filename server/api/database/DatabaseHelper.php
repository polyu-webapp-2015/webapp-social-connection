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

    public static function write_class_to_directory($directory, $class_array)
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
            $package_code = $package_code . "\nrequire_once '$filename';";
        }
        $filename = "package.php";
        echo "... $filename<br>";
        file_put_contents($directory . "/" . $filename, $package_code);
        echo "<br> written to $directory/ <hr>";
    }

    public static function generate_all_table_stub()
    {
        $field_class_array = [];
        $enum_class_array = [];
        $tables = self::get_table_name_array();
        foreach ($tables as $table) {
            $field_array = self::get_table_field_array($table);
            $field_class_array[] = self::generate_table_stub($table, $field_array);
            $enum_class_array[] = self::generate_enum_stub_array($field_array);
        }
        $enum_class_array = array_flatten($enum_class_array);
        /* generate field classes */
        self::write_class_to_directory(self::_field_directory, $field_class_array);
        /* generate enum classes */
        self::write_class_to_directory(self::_enum_directory, $enum_class_array);
    }

    public static function default_action()
    {
        log_object("default action");
        self::generate_all_table_stub();
    }
}
