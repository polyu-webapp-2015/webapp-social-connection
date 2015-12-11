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
        if (array_key_exists(APIFieldEnum::_session_id, $data)) {
            /* change session id for debug convenience */
            $intent_session_id = $data[APIFieldEnum::_session_id];
            session_id($intent_session_id);
        }
        session_start();
        $session_id = session_id();
//        if (session_status() == PHP_SESSION_ACTIVE && $session_id == session_id() && isset($_SESSION[Account_Fields::__account_id])) {
        if (isset($_SESSION[Account_Fields::__account_id])) {
            /* valid */
            return $_SESSION[Account_Fields::__account_id];
        } else {
            /* not valid or expired */
            throw new Exception("Session Expired", ResultCodeEnum::_Session_Expired);
        }
    }
}