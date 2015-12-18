<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class FollowActor extends Actor
{
    public $name = "Follow";
    public $params = array(
        Account_Fields::__account_id => "124"
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_latest_id => 123
    ];
    public $desc = "mono-directionally follow another user. 'Follower' follows 'Followed'";

    public function handle($data)
    {
        $source_account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $dest_user_id = $this->params[Account_Fields::__account_id];
        if ($dest_user_id == $source_account_id)
            throw new Exception("User following it's self", ResultCodeEnum::_Logic_Error);
        $field_value_array = [
            Follow_Fields::__follower_account_id => $source_account_id,
            Follow_Fields::__followed_account_id => $dest_user_id
        ];
        DatabaseHelper::table_insert(Follow_Fields::_, $field_value_array);
        $this->output[APIFieldEnum::_latest_id] = DatabaseHelper::lastInsertId();
        return $this->output;
    }
}

addAPI(new FollowActor());
