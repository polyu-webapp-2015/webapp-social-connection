<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/7/15
 * Time: 1:13 PM
 */
class ExceptionUtils
{
    /**
     * @param PDOException $PDOException
     * @param bool $include_trace
     * @return array
     */
    public static function PDOException_to_array($PDOException, $include_trace = true)
    {
        $arr = [
            "code" => $PDOException->getCode(),
            "message" => $PDOException->getMessage(),
            "file" => $PDOException->getFile(),
            "line" => $PDOException->getLine(),
            "previous exception" => self::Exception_to_array($PDOException->getPrevious(), false)
        ];
        if ($include_trace)
            $arr["trace"] = $PDOException->getTrace();
        elseif (Config::$_ini[Config::__full_debug_on_database])
            $arr["trace"] = $PDOException->getTrace()[0];
        return $arr;
    }

    /**
     * @param PDOException $PDOException
     * @return array
     * @deprecated
     */
    public static function wrap_PDOException($PDOException)
    {
        $message = self::PDOException_to_array($PDOException);
        $message = json_encode($message);
        $code = $PDOException->getCode();
        if (!is_int($code))
            $code = ResultCodeEnum::_Unknown_Database_Error;
        $exception = new Exception($message, $code, $PDOException->getPrevious());
        return $exception;
    }

    /**
     * @param PDOException|Exception $exception
     * @param bool $include_trace
     * @return array
     */
    public static function Exception_to_array($exception, $include_trace = true)
    {
        if ($exception == null)
            return null;
        elseif (get_class($exception) == PDOException::class)
            return self::PDOException_to_array($exception, $include_trace);
        else {
            $arr = [
                "code" => $exception->getCode(),
                "message" => $exception->getMessage(),
                "file" => $exception->getFile(),
                "line" => $exception->getLine(),
                "previous exception" => self::Exception_to_array($exception->getPrevious(), false)
            ];
            if ($include_trace)
                $arr["trace"] = $exception->getTrace();
            return $arr;
        }
    }
}