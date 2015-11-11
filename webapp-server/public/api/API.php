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
    public $params;
    public $desc;

    /*public function __toString()
    {
        // TODO: Implement __toString() method.
        print_r($this->params);
        $this->params
        return $this->name . "\t\t" . $this->params . "\t\t" . $this->desc;
    }*/

    public function printAPI()
    {
        echo "<pre>";
        echo "name : $this->name\n";
        echo "params : ";
        if (empty($this->params)) {
            echo "empty\n";
        } elseif (is_array($this->params)) {
            print_r($this->params);
        } elseif (is_string($this->params)) {
            echo $this->params . "\n";
        } else {
            echo "cannot display\n";
        }
        echo "desc : $this->desc";
        echo "</pre>";
    }
}

class API extends APIClass
{
    public $name = "API";
    public $params = array();
    public $desc = "show all API available";
    protected $list = array();

    function addAPI($apiClass)
    {
        $this->list[] = $apiClass;
    }

    function getAllAPI()
    {
        return $this->list;
    }

    function printAllAPI()
    {
        echo "Total API : " . count($this->list) . "<hr>";
        foreach ($this->list as $api) {
            $api->printAPI();
            echo "<hr>";
        }
    }
}

$API = new API();
function addAPI($newAPI)
{
    global $API;
    $API->addAPI($newAPI);
}

addAPI($API);
