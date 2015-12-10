<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 6:31 PM
 */
class ErrorResponse
{

    /**
     * @param int $result_code
     * @param string $msg
     */
    public static function response($result_code, $msg = "")
    {
        if (!Config::_AIP_Always_OK) header('HTTP/1.0 400 Bad Request', true, 400);
        $output = [
            APIFieldEnum::_ResultCode => ResultCodeEnum::getString($result_code),
            APIFieldEnum::_Reason => $msg
        ];
        die(json_encode($output));
    }

    /**
     * @param $simple_msg
     * @param PDOStatement $statement
     * @return string
     */
    public static function generate_pdo_error_msg($simple_msg, $statement = null)
    {
        $msg = [];
        $msg["simple"] = $simple_msg;
        $msg["sql error code"] = DatabaseHelper::$_pdo->errorCode();
        $msg["sql error info"] = DatabaseHelper::$_pdo->errorInfo();
        if ($statement != null)
            $msg["sql query"] = $statement->queryString;
        return json_encode($msg);
    }
}