<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/18/15
 * Time: 11:45 AM
 */
class CreateUserActor extends Actor
{
    public $name = "CreateUser";
    public $params = array("emailOrPhoneNum" => "98765432",
        "password" => "ThePass123",
        "sex" => "1");
    public $output = array(self::_k1 => -1);
    public $desc = "check if the email or phone number is NOT registered";

    const _k1 = "sessionId";
    const _op = DatabaseHelper::_CREATE_WITHOUT_ID;
    const _path = ["users"];

    public function handle($data)
    {
        foreach ($this->params as $key => $value) {
            if (array_key_exists($key, $data))
                $this->params[$key] = $value;
            else
                throw new Exception("missing param $key", ResultCodeEnum::_Request_Param_Missing);
        }
        $db = new DatabaseHelper();
//        print_object($data);
//        $value = $data['emailOrPhoneNum'];
//        if (strpos($value, '@') != false)
//            $key = "email";
//        else
//            $key = "phoneNum";
//        $path = array("users");
//        $this->params = array($key, $value);
//        $data = array($this->params);
//        echo "before db";
        $data = array($this->params);
        $response = $db->exec(self::_op, self::_path, $data);
//        echo "after db";
//        echo $response."--------";
        $result = json_decode($response, true);
        $this->output = $result;
//        echo "=========";
//        echo json_encode($this->output);
//        echo "=========";
//        parent::handle($data);
        return $this->output;
    }
}

$_createUserActor = new CreateUserActor();
addAPI($_createUserActor);
