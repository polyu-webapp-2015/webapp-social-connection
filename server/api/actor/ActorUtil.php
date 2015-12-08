<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 4:49 PM
 */
class ActorUtil
{
    /**
     * @param array $data : param from client request
     * @return string account_id
     * @throws Exception
     */
    public static function check_session_valid(array $data)
    {
        $session_id = $data[APIFieldEnum::_Session_ID];
        if (empty(session_id()))
            session_id($session_id);
        session_start();
        if (session_status() == PHP_SESSION_ACTIVE && $session_id == session_id() && isset($_SESSION[Account_Fields::__account_id])) {
            /* valid */
            return $_SESSION[Account_Fields::__account_id];
        } else {
            /* not valid or expired */
            throw new Exception("Session Expired", ResultCodeEnum::_Session_Expired);
        }
    }
}