<?php

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class IsEmailOrPhoneNumUniqueActor extends Actor
{
    public $name = "IsEmailOrPhoneNumUnique";
    public $params = array("emailOrPhoneNum" => "98765432");
    public $output = array(self::_k1 => 0);
    public $desc = "check if the email or phone number is NOT registered";

    const _k1 = "isEmailOrPhoneNumUnique";
    const _op = DatabaseHelper::_EXIST_UNDER;
    const _path = array("users");

    public function handle($data)
    {
        $db = new DatabaseHelper();
        $value = $data['emailOrPhoneNum'];
        if (strpos($value, '@') != false)
            $key = "email";
        else
            $key = "phoneNum";
        $this->params = array($key, $value);
        $data = array($this->params);
        $response = $db->exec(self::_op, self::_path, $data);
        $result = json_decode($response, true);
        $this->output[self::_k1] = !$result[self::_op];
        return $this->output;
    }
}

$_isEmailOrPhoneNumUniqueActor = new IsEmailOrPhoneNumUniqueActor();
addAPI($_isEmailOrPhoneNumUniqueActor);
