<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 5:38 PM
 */
class DatabaseOperator
{
    const __emailOrPhoneNum = "emailOrPhoneNum";

    public static function is_email($emailOrPhoneNum)
    {
        return strpos('@', $emailOrPhoneNum) != false;
    }

    public static function getAccountId($emailOrPhoneNum, $password)
    {
        if (self::is_email($emailOrPhoneNum)) {
            $type=Account_Fields::__email;
        } else {
            $type=Account_Fields::__phone_num;
        }
        $sql="select * from ";
    }
}