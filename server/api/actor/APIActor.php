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
    public $output = "html";

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
        /** @var Actor $api */
        foreach ($this->list as $api) {
            if (loss_match($api->name, $api_name)) {
                try {
                    $api->check_param($data);
                    log_object("routed to " . $api->name);
                    $output = $api->handle($data);
                    $output[APIFieldEnum::_Action] = $api_name;
                } catch (Exception $e) {
                    log_object_from_named("Exception catched",get_called_class());
                    if (!Config::_AIP_Always_OK) header('HTTP/1.0 400 Bad Request', true, 400);
                    $output = [
                        APIFieldEnum::_ResultCode => $e->getCode(),
                        APIFieldEnum::_Reason => [
                            "type" => "Exception",
                            "detail" => ExceptionUtils::Exception_to_array($e)
                        ]
                    ];
                }
                if (array_key_exists(APIFieldEnum::_ResultCode, $output) && $output[APIFieldEnum::_ResultCode] != ResultCodeEnum::_Success) {
                    if (!Config::_AIP_Always_OK) header('HTTP/1.0 400 Bad Request', true, 400);
                }
                if (array_key_exists(APIFieldEnum::_ResultCode, $output) && is_numeric($output[APIFieldEnum::_ResultCode])) {
                    $output[APIFieldEnum::_ResultCode] = ResultCodeEnum::getString($output[APIFieldEnum::_ResultCode]);
                }
                echo json_encode($output);
                $found = true;
                break;
            }
        }
        if (!$found) {
            ErrorResponse::response(ResultCodeEnum::_Unknown_API, "cannot found API Actor on $api_name");
        }
    }

    function printAllAPI()
    {
        echo "Total API : " . count($this->list) . "<hr>";
        foreach ($this->list as $api) {
            /** @var Actor $api */
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
