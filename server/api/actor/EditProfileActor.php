<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class EditProfileActor extends Actor
{
    public $name = "EditProfile";
    public $params = array(
        User_Fields::__account_id => "123",
        APIFieldEnum::_field_array => [
            [User_Fields::__first_name => "Chan"],
            [User_Fields::__last_name => "Tai Man"],
            [User_Fields::__title_id => 1]
        ]
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success
    ];
    public $desc = "update User (self or other for admin) Info, aka edit profile";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $target_account_id = $this->params[User_Fields::__account_id];
        if ($account_id != $target_account_id) {
            $account_type = DatabaseOperator::getAccountType($account_id);
            if ($account_type != account_type_Enum::__admin && $account_type != account_type_Enum::__helper)
                throw new Exception("This user ($account_type) cannot set user info of other user", ResultCodeEnum::_No_Permission);
        }
        $user_info_array = $this->params[APIFieldEnum::_field_array];
        $table_name = User_Fields::_;
        $where_statement = DatabaseHelper::field_value_to_statement([
            User_Fields::__account_id => $target_account_id
        ]);
        $result = DatabaseHelper::update_on_table($table_name, $user_info_array, $where_statement);
        return $this->output;
    }
}

addAPI(new EditProfileActor());
