<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * @deprecated
 * @suspended
 */
class SearchUserListActor extends Actor
{
    public $name = "GetUserList";
    public $params = array(
        APIFieldEnum::_Session_ID => "t63slq6a340mo41rppmkvce5l4",
        Account_Fields::__account_type => account_type_Enum::__attendee,
    );
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success,
        APIFieldEnum::_Session_ID => ''
    ];
    public $desc = "Get User info (single or multiple user)";

    public function handle($data)
    {
        put_all_into($data, $this->params);
        $emailOrPhoneNum = $this->params[DatabaseOperator::__emailOrPhoneNum];
        $password = $this->params[Account_Fields::__password];
        $account_id = DatabaseOperator::isPasswordCorrect($emailOrPhoneNum, $password);
        if ($account_id != false) {
            /* save session info */
            if (session_start()) {
                $session_id = session_id();
                $_SESSION[Account_Fields::__account_id] = $account_id;
                $this->output[APIFieldEnum::_Session_ID] = $session_id;
            } else {
                $this->output[APIFieldEnum::_ResultCode ]= ResultCodeEnum::_Server_Unknown_Error;
            }
        } else {
            if (DatabaseOperator::findAccountId($emailOrPhoneNum) == false)
                $this->output[APIFieldEnum::_ResultCode] = ResultCodeEnum::_User_Not_Exist;
            else
                $this->output[APIFieldEnum::_ResultCode] = ResultCodeEnum::_Password_Wrong;
        }
        return $this->output;
    }
}

addAPI(new SearchUserListActor());
