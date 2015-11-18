<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 3:19 PM
 */

class APIActor extends Actor
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

    function route($api_name, $data)
    {
        $found = false;
        foreach ($this->list as $api) {
            if (loss_match($api->name, $api_name)) {
                $api->handle($data);
                $found = true;
                break;
            }
        }
        if (!$found) {
            header('HTTP/1.0 400 Bad Request', true, 400);
            die("unknown api");
        }
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

$API = new APIActor();
function addAPI($newAPI)
{
    global $API;
    $API->addAPI($newAPI);
}

addAPI($API);
