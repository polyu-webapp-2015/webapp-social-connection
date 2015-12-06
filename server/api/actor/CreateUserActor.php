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
        User_Fields::__sex => sex_Enum::__unknown
    );
    public $output = [ResultCodeEnum::_ => ResultCodeEnum::_Success];
    public $desc = "check if the email or phone number is NOT registered";

    public function handle($data)
    {
        put_all_into($data, $this->params);
        $emailOrPhoneNum = $this->params[DatabaseOperator::__emailOrPhoneNum];
        $password = $this->params[Account_Fields::__password];
        if (DatabaseOperator::findAccountId($emailOrPhoneNum) == false) {
            file_put_contents("UserInsert","test");
            $prepared_statement="INSERT INTO `social_connection`.`User`(`account_id`,`sex`,`first_name`,`last_name`,`organization_id`,`title_id`,`city_id`)VALUES(?,?,?,?,?,?,?);";
            $prepared_statement_type="ssssss";
            $statement=DatabaseHelper::prepare($prepared_statement);
//            $statement->bind_param($prepared_statement_type,);
        } else {
            $this->output[ResultCodeEnum::_] = ResultCodeEnum::_Duplicated;
        }
        return $this->output;
    }
}

$_createUserActor = new CreateUserActor();
addAPI($_createUserActor);
