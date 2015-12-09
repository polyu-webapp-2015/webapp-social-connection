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
        DatabaseOperator::__emailOrPhoneNum => "98765432",
        Account_Fields::__password => "ThePass123",
        Account_Fields::__account_type => account_type_Enum::__attendee,
        User_Fields::__sex => sex_Enum::__F
    );
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success,
        Account_Fields::__account_id => 123
    ];
    public $desc = "Sign up new user";

    public function handle($data)
    {
        $operator_account_id=ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $emailOrPhoneNum = $this->params[DatabaseOperator::__emailOrPhoneNum];
        $password = $this->params[Account_Fields::__password];
        $account_type = $this->params[Account_Fields::__account_type];
        $sex = $this->params[User_Fields::__sex];
        if (DatabaseOperator::findAccountId($emailOrPhoneNum) == false) {
            /* create account */
            $field_value_array = [
                Account_Fields::__password => $password,
                Account_Fields::__account_type => $account_type,
                Account_Fields::__email => $emailOrPhoneNum,
                Account_Fields::__phone_num => $emailOrPhoneNum
            ];
            DatabaseHelper::table_insert(Account_Fields::_, $field_value_array);
            $account_id = DatabaseHelper::$_pdo->lastInsertId();
            /* create User */
            $field_value_array = [
                User_Fields::__account_id => $account_id,
                User_Fields::__sex => $sex,
            ];
            DatabaseHelper::table_insert(User_Fields::_, $field_value_array);
            $this->output[Account_Fields::__account_id] = $account_id;
        } else {
            throw new Exception("The email or phone is already used",
                ResultCodeEnum::_Duplicated);
        }
        return $this->output;
    }
}

$_createUserActor = new CreateUserActor();
addAPI($_createUserActor);