<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 6:31 PM
 */
class ErrorResponse
{

    public static function response($result_code, $msg = "")
    {
        header('HTTP/1.0 400 Bad Request', true, 400);
        $output = [
            APIFieldEnum::_ResultCode => $result_code,
            APIFieldEnum::_Reason => $msg
        ];
        die(json_encode($output));
    }

    public static function generate_pdo_error_msg($simple_msg)
    {
        $msg = [];
        $msg["simple"] = $simple_msg;
        $msg["sql error code"] = DatabaseHelper::$_pdo->errorCode();
        $msg["sql error info"] = DatabaseHelper::$_pdo->errorInfo();
        return json_encode( $msg);
    }
}