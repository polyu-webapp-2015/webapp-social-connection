<?php
include_once 'API.php';
include_once 'DatabaseHelper.php';

/**
 * Created by PhpStorm.
 * User: beenotung
 * Date: 11/10/15
 * Time: 7:51 PM
 */
class IsEmailOrPhoneNumUniqueAPI extends APIClass
{
    public $name = "IsEmailOrPhoneNumUnique";
    public $params = array("emailOrPhoneNum" => "98765432");
    public $output = array("isEmailOrPhoneNumUnique" => 0);
    public $desc = "check if the email or phone number is NOT registered";

    public function handle($data)
    {
        $db = new DatabaseHelper();
        $value = $data['emailOrPhoneNum'];
        if (strpos($value, '@') != false)
            $key = "email";
        else
            $key = "phoneNum";
        $path = array("users");
        $data = array(array($key, $value));
        $result = $db->exec(DatabaseHelper::EXIST_UNDER, $path, $data);
        echo $result;
    }
}

$IsEmailOrPhoneNumUniqueAPI = new IsEmailOrPhoneNumUniqueAPI();
addAPI($IsEmailOrPhoneNumUniqueAPI);
