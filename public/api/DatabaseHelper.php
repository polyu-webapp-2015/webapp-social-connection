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

    const SET = "SET";
    const GET = "GET";
    const COMPARE = "COMPARE";
    const EXIST = "EXIST";
    const EXIST_UNDER = "EXIST_UNDER";

    public function exec($action, $path, $data)
    {
        global $_db_host;
        $port = $this->getPort();
        $sock = fsockopen($_db_host, $port);
        if ($sock == false)
            throw new DatabaseServiceNotAvailableException("failed to connect to database");
        $param = array("action" => $action, "path" => $path, "data" => $data);
        $payload = json_encode($param);
        fwrite($sock, "$payload\n");
        fflush($sock);
        $read = fread($sock, 1024);
        socket_close($sock);
        if ($read == false) {
            throw new DatabaseServiceNotAvailableException("no response from database");
        } else {
            return $read;
        }
    }

    public function test()
    {
        global $_db_host;
        print("step 0");
        $port = $this->getPort();
        print("step 1");
        $sock = fsockopen($_db_host, $port) or die("failed to init");
        print("step 2");
        $action = "emailorph";
        $data = "421";
        $param = array("action" => $action, "data" => $data);
        $payload = json_encode($param);
        fwrite($sock, "$payload\n");
        print("step 3");
        fflush($sock);
        print("step 4");
        $read = fread($sock, 1024);
        print("step 5");
        if ($read == false) {
            echo "failed to read";
        } else {
            echo "read=$read";
        }
        print("step 6");
        socket_close($sock);
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
