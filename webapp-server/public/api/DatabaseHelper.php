<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/16/15
 * Time: 1:28 PM
 */
class DatabaseHelper
{
    private $remote_port = 9999;
    private $remote_host = "localhost";

    public function test()
    {
        $socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
        $connection = socket_connect($socket, $this->remote_host, $this->remote_port);
        socket_write($connection, "test");
        while ($buffer = socket_read($socket, 1024)) {
            echo $buffer;
        }
    }
}
