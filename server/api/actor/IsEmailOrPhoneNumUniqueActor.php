<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/18/15
 * Time: 11:45 AM
 */
class IsEmailOrPhoneNumUniqueActor extends Actor
{
    public $name = "IsEmailOrPhoneNumUnique";
    public $params = array(
        DatabaseOperator::__emailOrPhoneNum => "98765432",
    );
    public $output = [ResultCodeEnum::_ => ResultCodeEnum::_Success];
    public $desc = "check if the email or phone number is NOT registered";

    public function handle($data)
    {
        put_all_into($data, $this->params);
        $emailOrPhoneNum = $this->params[DatabaseOperator::__emailOrPhoneNum];
        if (DatabaseOperator::findAccountId($emailOrPhoneNum) != false) {
            $this->output[ResultCodeEnum::_] = ResultCodeEnum::_Duplicated;
        }
        return $this->output;
    }
}

$_isEmailOrPhoneNumUniqueActor = new IsEmailOrPhoneNumUniqueActor();
addAPI($_isEmailOrPhoneNumUniqueActor);
