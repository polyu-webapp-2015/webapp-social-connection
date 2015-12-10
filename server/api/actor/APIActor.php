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
                    $output[APIFieldEnum::_action] = $api_name;
                } catch (Exception $e) {
                    log_object_from_named("Exception catched",get_called_class());
                    if (!Config::_AIP_Always_OK) header('HTTP/1.0 400 Bad Request', true, 400);
                    $output = [
                        APIFieldEnum::_result_code => $e->getCode(),
                        APIFieldEnum::_reason => [
                            "type" => "Exception",
                            "detail" => ExceptionUtils::Exception_to_array($e)
                        ]
                    ];
                }
                if (array_key_exists(APIFieldEnum::_result_code, $output) && $output[APIFieldEnum::_result_code] != ResultCodeEnum::_Success) {
                    if (!Config::_AIP_Always_OK) header('HTTP/1.0 400 Bad Request', true, 400);
                }
                if (array_key_exists(APIFieldEnum::_result_code, $output) && is_numeric($output[APIFieldEnum::_result_code])) {
                    $output[APIFieldEnum::_result_code] = ResultCodeEnum::getString($output[APIFieldEnum::_result_code]);
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
