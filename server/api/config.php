<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/17/15
 * Time: 10:17 AM
 */
class Config
{
    const  _file = "../config.ini";

    const __database_host = "database_host";
    const __database_port = "database_port";
    const __database_user = "database_user";
    const __database_password = "database_password";

    const _keys = [
        self::__database_host,
        self::__database_port,
        self::__database_user,
        self::__database_password
    ];

    public $ini;

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
    public function __construct()
    {
        $this->load_from_file();
    }

    private function load_from_file()
    {
        log_object("reading " . self::_file);
        $this->ini = parse_ini_file(self::_file);
        foreach(self::_keys as $key){
            if(!array_key_exists($key,$this->ini))
            {
                error_log("missing $key from config file");
                die(ResultCode::_se)
            }
        }
        log_object($ini);
    }
}

$_config = new Config();
