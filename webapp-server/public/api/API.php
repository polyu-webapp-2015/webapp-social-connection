<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 3:19 PM
 */
include_once 'utils.php';

class APIClass
{
    public $name;
    public $params;
    public $output;
    public $desc;

    public function printAPI()
    {
        echo "<pre>";
        echo "name : $this->name\n";
        echo "params : ";
        print_object($this->params);
        echo "outputs : ";
        print_object($this->output);
        echo "desc : $this->desc";
        echo "</pre>";
    }
    public function handle($data){
        throw new Exception('not implemented');
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

    function route($api_name,$data)
    {
        foreach ($this->list as $api) {
            if (strcasecmp($api->name, $api_name) == 0) {
                $api->handle($data);
                break;
            }
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

$API = new API();
function addAPI($newAPI)
{
    global $API;
    $API->addAPI($newAPI);
}

addAPI($API);
