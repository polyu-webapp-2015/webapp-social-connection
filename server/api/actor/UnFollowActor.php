<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class UnFollowActor extends Actor
{
    public $name = "UnFollow";
    public $params = array(
        Account_Fields::__account_id => "124"
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
    ];
    public $desc = "mono-directionally UnFollow another user. 'Follower' unfollows 'Followed'";

    public function handle($data)
    {
        $source_account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $dest_user_id = $this->params[Account_Fields::__account_id];

        if ($dest_user_id == $source_account_id)
            throw new Exception("User unfollowing it's self", ResultCodeEnum::_Logic_Error);

        $param_array = [
            ':' . Follow_Fields::__follower_account_id => $source_account_id,
            ':' . Follow_Fields::__followed_account_id => $dest_user_id
        ];
        $result=DatabaseHelper::get_prepare_and_execute('unfollow.sql', $param_array);
//        log_object_from_named($dest_user_id,"dest");
//        log_object_from_named($source_account_id,"source");
//        log_object_from_named($result,"unfollow actor");

        return $this->output;
    }
}

addAPI(new UnFollowActor());
