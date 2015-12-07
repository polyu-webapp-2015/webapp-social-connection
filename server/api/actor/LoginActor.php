<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/18/15
 * Time: 11:45 AM
 */
class LoginActor extends Actor
{
    public $name = "Login";
    public $params = array(
        DatabaseOperator::__emailOrPhoneNum => "98765432",
        Account_Fields::__password => "ThePass123",
    );
    public $output = [
        ResultCodeEnum::_ => ResultCodeEnum::_Success,
        "sessionId" => 0
    ];
    public $desc = "Sign up new user";

    public function handle($data)
    {
        put_all_into($data, $this->params);
        $emailOrPhoneNum = $this->params[DatabaseOperator::__emailOrPhoneNum];
        $password = $this->params[Account_Fields::__password];
        $account_id = DatabaseOperator::isPasswordCorrect($emailOrPhoneNum, $password);
        if ($account_id != false) {
            /* generate session Id */
//            $this->output[Account_Fields::__account_id] = $account_id;
            if (session_start()) {
                $session_id = session_id();
                $this->output["sessionId"]=$session_id;
            } else {
                $this->output[ResultCodeEnum::_]=ResultCodeEnum::_Server_Unknown_Error;
            }
        } else {
            if (DatabaseOperator::findAccountId($emailOrPhoneNum) == false)
                $this->output[ResultCodeEnum::_] = ResultCodeEnum::_User_Not_Exist;
            else
                $this->output[ResultCodeEnum::_] = ResultCodeEnum::_Password_Wrong;
        }
        return $this->output;
    }
}

$_loginActor = new LoginActor();
addAPI($_loginActor);
