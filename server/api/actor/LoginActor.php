<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class LoginActor extends Actor
{
    public $name = "Login";
    public $params = array(
        DatabaseOperator::__emailOrPhoneNum => "admin@gmail.com",
        Account_Fields::__password => "123456",
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        Account_Fields::__account_id => '123',
        APIFieldEnum::_profile => [],
        APIFieldEnum::_session_id => "123"
    ];
    public $desc = "Login and get session id (as identity)";

    public function handle($data)
    {
        put_all_into($data, $this->params);
        $emailOrPhoneNum = $this->params[DatabaseOperator::__emailOrPhoneNum];
        $password = $this->params[Account_Fields::__password];
        $account_id = DatabaseOperator::isPasswordCorrect($emailOrPhoneNum, $password);
        if ($account_id != false) {
            /* save session info */
            if (session_start()) {
                session_regenerate_id(true);
                $session_id = session_id();
                $_SESSION[Account_Fields::__account_id] = $account_id;
                log_object_from_named("New Session ID = $session_id", get_called_class());
                $this->output[Account_Fields::__account_id] = $account_id;
                $actor = new GetProfileActor();
                $pass_data = $data;
                $pass_data[User_Fields::__account_id] = $account_id;
                $pass_output = $actor->handle($pass_data);
                $this->output[APIFieldEnum::_profile] = $pass_output[APIFieldEnum::_profile];
                $this->output[APIFieldEnum::_session_id] = $session_id;
            } else {
                $this->output[APIFieldEnum::_result_code] = ResultCodeEnum::_Server_Unknown_Error;
            }
        } else {
            if (DatabaseOperator::findAccountId($emailOrPhoneNum) == false)
                $this->output[APIFieldEnum::_result_code] = ResultCodeEnum::_User_Not_Exist;
            else
                $this->output[APIFieldEnum::_result_code] = ResultCodeEnum::_Password_Wrong;
        }
        return $this->output;
    }
}

addAPI(new LoginActor());
