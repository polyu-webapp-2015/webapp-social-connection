<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 3:19 PM
 */
class APIClass
{
    public $name;
    public $param;
    public $desc;
}

class API extends APIClass
{
    public $name = "API";
    public $param = array();
    public $desc = "show all API available";
    protected $list = array("API" => this);

    function  add($apiClass)
    {
        array_push($list, $apiClass);
    }

    function getAll()
    {
        return $this->list;
    }
}