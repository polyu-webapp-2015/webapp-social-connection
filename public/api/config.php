<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/17/15
 * Time: 10:17 AM
 */
class Config
{
    const _db_port = 9000;
    const _db_host = "localhost";
    const _db_url = "http://" . self::_db_host . ":" . self::_db_port . "/";

    /**
     * @define if heart_beat_rate is slower then
     * $_heart_beat_duration_in_seconds * $_heart_beat_ratio
     * consider the user logout
     */
    const _heart_beat_duration_in_seconds = 10;
    const _heart_beat_ratio = 2;
}
