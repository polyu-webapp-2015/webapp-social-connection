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
    public static $_connection;

    public static function check_connection()
    {
        if (self::$_connection == null)
            self::connect();
    }

    public static function connect()
    {
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

    public static function get_table_field_name_array($table_name)
    {
        self::check_connection();
        $sql = "DESCRIBE $table_name;";
        $result = mysqli_query(self::$_connection, $sql);
        $field_array = [];
        while ($row = mysqli_fetch_array($result)) {
            $field_array[] = $row[0];
        }
        return $field_array;
    }

    const __filename = "filename";
    const __code = "code";
    const _directory = "database/table_field";

    public static function generate_table_stub($table_name, array $field_name_array)
    {
        $file_name = $table_name . "_Field.php";
        $code = "<?php\n" . "class $table_name" . "_Fields {";
        foreach ($field_name_array as $field_name) {
            $code = $code . "\n    const __$field_name = \"$field_name\" ;";
        }
        $code = $code . "\n}";
        return [
            self::__filename => $file_name,
            self::__code => $code
        ];
    }

    public static function generate_all_table_stub()
    {
        $class_array = [];
        $tables = self::get_table_name_array();
        foreach ($tables as $table) {
            $fields = self::get_table_field_name_array($table);
            $class_array[] = self::generate_table_stub($table, $fields);
        }
        if (!file_exists(self::_directory)) {
            mkdir(self::_directory, 0755, true);
        }
        $package_code = "<?php";
        foreach ($class_array as $class) {
            $filename = $class[self::__filename];
            $code = $class[self::__code];
            echo "... $filename<br>";
            file_put_contents(self::_directory . "/" . $filename, $code);
            $package_code = $package_code . "\nrequire_once \'$filename\';";
        }
        $filename = "package.php";
        echo "... $filename<br>";
        file_put_contents(self::_directory . "/" . $filename, $package_code);
        echo "<br> written to " . self::_directory . "/<br>";
    }

    public static function default_action()
    {
        log_object("default action");
        self::generate_all_table_stub();
    }
}
