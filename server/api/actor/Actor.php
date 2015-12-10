<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 3:19 PM
 */
abstract class Actor
{
//    const __result_code = ResultFieldEnum::_Result_Code;
//    const __reason = ResultFieldEnum::_Result_Reason;
    const __data = "data";
    public $name = "Actor";
    public $params = [];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        self::__data => []
    ];
    public $desc = "abstract Actor";

    public function is_param_matched($data)
    {
        return is_array_key_matched($this->params, $data);
    }

    public function check_param($data)
    {
        foreach ($this->params as $key => $value) {
//            log_object("-------------");
//            log_object("____1____");
//            log_object($this->params);
//            log_object("____2____");
//            log_object($key);
//            log_object("____3____");
//            log_object($value);
//            log_object("____4____");
//            log_object($data);
//            log_object("***********");
            if (!array_key_exists($key, $data)) {
                header('HTTP/1.0 400 Bad Request', true, 400);
                throw new Exception("missing param $key", ResultCodeEnum::_Request_Param_Missing);
            }
        }
    }

    public function printAPI()
    {
        echo "<pre>";
        echo "name : $this->name\n";
        echo "params : ";
//        print_object($this->params);
        print_object("<pre>" . json_encode($this->params, JSON_PRETTY_PRINT) . "</pre>");
        echo "outputs : ";
//        print_object($this->output);
        print_object("<pre>" . json_encode($this->output, JSON_PRETTY_PRINT) . "</pre>");
        echo "desc : $this->desc";
        echo "</pre>";
    }

    /**
     * @param $data
     * @return array
     * @throws Exception
     */
    public function handle($data)
    {
        throw new Exception("API $this->name not implemented");
    }
}


