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
    public $params = array(
        "emailOrPhoneNum" => "98765432",
        "password" => "ThePass123",
        "sex" => "1"
    );
    public $output = [ResultCodeEnum::_=>ResultCodeEnum::_Success];
    public $desc = "check if the email or phone number is NOT registered";

    public function handle($data)
    {
        put_all_into($data,$this->params);

        return $this->output;
    }
}

$_createUserActor = new CreateUserActor();
addAPI($_createUserActor);
