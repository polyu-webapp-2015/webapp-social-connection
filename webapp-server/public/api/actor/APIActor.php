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
                $output = [];
                try {
                    $output = $api->handle($data);
                    $output["resultCode"] = 0;
                } catch (Exception $e) {
                    header('HTTP/1.0 400 Bad Request', true, 400);
                    $output = ["resultCode" => $e->getCode(), "reason" =>
                        ["type" => "Exception",
                            "detail" => [
                                "code" => $e->getCode(),
                                "message" => $e->getMessage(),
                                "trace" => $e->getTrace(),
                            ]]
                    ];
                }
                echo json_encode($output);
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

$_API = new APIActor();
function addAPI($newAPI)
{
    global $_API;
    $_API->addAPI($newAPI);
}

addAPI($_API);
