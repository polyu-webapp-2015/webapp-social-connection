<?php
include_once 'config.php';

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 1:28 PM
 */
class DatabaseHelper
{

    public function showPort()
    {
        echo "port=" . $this->getPort();
    }

    public function test()
    {
//        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
//        global $_db_port;
        global $_db_host;
//        global $_db_url;
//        $connection = socket_connect($socket, $_db_host, $_db_port);
//        socket_write($socket, "test");
//        while ($buffer = socket_read($socket, 1024)) {
//            echo $buffer;
//        }
//        error_log(print_r("step 1", TRUE));
        print("step 0");
        $port = $this->getPort();
        print("step 1");
//        $sock = socket_create(AF_INET, SOCK_STREAM, IPPROTO_IP) or die("Cannot init connection to database");
        $sock = fsockopen($_db_host, $port) or die("failed to init");
        print("step 2");
//        socket_connect($sock, $_db_host, $port) or die("Cannot connect to database");
        $action = "emailorph";
        $data = "421";
        $param = array("action" => $action, "data" => $data);
        $payload=json_encode($param);
        fwrite($sock, "$payload\n");
        print("step 3");
//        socket_write($sock, "test");
        fflush($sock);
        print("step 4");
//        socket
//        fclose($sock);
//        print("step 5");
//        $read = socket_read($sock, 1024);
        $read = fread($sock, 1024);
        print("step 5");
        if ($read == false) {
            echo "failed to read";
        } else {
            echo "read=$read";
        }
        print("step 6");
        socket_close($sock);
//        print("step 7");
    }


    public function getPort()
    {
        global $_db_url;
        $result = file_get_contents($_db_url . "dbPort");
        if ($result == false) {
            throw new DatabaseServiceNotAvailableException("dbPort");
        } else {
            return $result;
        }
    }
}
