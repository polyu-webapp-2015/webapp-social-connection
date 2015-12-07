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
        ResultCodeEnum::_ => ResultCodeEnum::_Success,
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
            if (!array_key_exists($key, $data))
                throw new Exception("missing param $key", ResultCodeEnum::_Request_Param_Missing);
        }
    }

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


