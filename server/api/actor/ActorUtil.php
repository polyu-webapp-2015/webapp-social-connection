<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 4:49 PM
 */
class ActorUtil
{
    const __emailOrPhoneNum = "emailOrPhoneNum";

    public static function is_email($emailOrPhoneNum)
    {
        return strpos('@', $emailOrPhoneNum) != false;
    }
}