<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class FollowActor extends Actor
{
    public $name = "Follow";
    public $params = array(
        APIFieldEnum::_Follower_User_ID => "123",
        APIFieldEnum::_Followed_User_ID => "124"
    );
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success
    ];
    public $desc = "mono-directionally follow another user. 'Follower' follows 'Followed'";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $source_account_id = $this->params[APIFieldEnum::_Follower_User_ID];
        if ($account_id != $source_account_id) {
            $account_type = DatabaseOperator::getAccountType($account_id);
            if ($account_type != account_type_Enum::__admin && $account_type != account_type_Enum::__helper)
                throw new Exception("This user ($account_type) cannot set other user's following relationship", ResultCodeEnum::_No_Permission);
        }
        $dest_user_id = $this->params[APIFieldEnum::_Followed_User_ID];
        if ($dest_user_id == $source_account_id)
            throw new Exception("User following it's self", ResultCodeEnum::_Logic_Error);
        $field_array = [
            Friendship_Fields::__host_id => $source_account_id,
            Friendship_Fields::__guest_id => $dest_user_id
        ];
        //TODO
        DatabaseHelper::table_insert(Friendship_Fields::_, $field_array);
        return $this->output;
    }
}

addAPI(new FollowActor());
