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

    public function handle($data)
    {
        $db = new DatabaseHelper();
        $value = $data['emailOrPhoneNum'];
        if (strpos($value, '@') != false)
            $key = "email";
        else
            $key = "phoneNum";
        $path = array("users");
        $this->params = array($key, $value);
        $data = array($this->params);
        $response = $db->exec(self::_op, $path, $data);
        $result = json_decode($response, true);
        $this->output[self::_k1] = !$result[self::_op];
        echo "=========";
        echo json_encode($this->output);
        echo "=========";
        parent::handle($data);
    }
}

$_createUserActor = new CreateUserActor();
addAPI($_createUserActor);
