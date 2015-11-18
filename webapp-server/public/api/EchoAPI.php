<?php
include_once 'API.php';

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class EchoAPI extends APIClass
{
    public $name = "Echo";
    public $params = "any";
    public $output = "any";
    public $desc = "echo the param";
}

$EchoAPI = new EchoAPI();
addAPI($EchoAPI);
