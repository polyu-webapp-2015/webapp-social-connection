<?php
require_once 'utils.php';

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/17/15
 * Time: 10:17 AM
 */
class Config
{
    /* use 200 status even when API call encounter error */
    const _AIP_Always_OK = true;

    const  _file = "../config.ini";

    const __database_host = "database_host";
    const __database_port = "database_port";
    const __database_user = "database_user";
    const __database_password = "database_password";
    const __database_name = "database_name";
    const __full_debug_on_database = "full_debug_on_database";
//    const __session_free_debug = "session_free_debug";

    /** @deprecated */
    const __database_library = "database_library";

    const _keys = [
        self::__database_host,
        self::__database_port,
        self::__database_user,
        self::__database_password,
        self::__database_name,
        self::__full_debug_on_database
//        self::__session_free_debug
    ];

    public static $_ini;

    /**
     * @define if heart_beat_rate is slower then
     * $_heart_beat_duration_in_seconds * $_heart_beat_ratio
     * consider the user logout
     */
    const _heart_beat_duration_in_seconds = 10;
    const _heart_beat_ratio = 2;

    /**
     * Config constructor.
     */
//    public function __construct()
//    {
//        $this->load_from_file();
//    }

    public static function load_from_file()
    {
//        log_object("reading " . self::_file);
        self::$_ini = parse_ini_file(self::_file);
        foreach (self::_keys as $key) {
            if (!array_key_exists($key, self::$_ini)) {
                ErrorResponse::response(ResultCodeEnum::_Server_Config_Error, "missing $key from config file");
            }
        }
//        log_object($this->ini);
    }
}

Config::load_from_file();
