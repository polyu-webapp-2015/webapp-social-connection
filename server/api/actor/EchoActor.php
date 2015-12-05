<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class EchoActor extends Actor
{
    public $name = "Echo";
    public $params = "any";
    public $output = "any";
    public $desc = "echo the param";
    public function handle($data)
    {
        print_object($data);
    }
}

$_echoActor = new EchoActor();
addAPI($_echoActor);
