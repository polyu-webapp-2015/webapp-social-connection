<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 6:31 PM
 */
class ErrorResponse
{

    public static function response($result_code, $msg="")
    {
        header('HTTP/1.0 400 Bad Request', true, 400);
        $output = [
            APIActor::__result_code => $result_code,
            APIActor::__reason => $msg
        ];
        die(json_encode($output));
    }
}