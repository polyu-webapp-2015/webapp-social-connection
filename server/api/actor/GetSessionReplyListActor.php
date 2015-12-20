<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetSessionReplyListActor extends Actor
{
    public $name = "GetSessionReplyList";
    public $params = array(
        Event_Fields::__event_id => 123
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "get list of reply on given session, including the replier profile";

    public function handle($data)
    {
        $requester_account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        /* get rich reply + profile list */
        /* 1. get list of reply */
        /* 2. get profile for each reply */
        /* 3. combine the reply and profile */

        /* step 1 */
        $target_event_id = $this->params[Event_Fields::__event_id];
        $field_value_array = [
            SessionReply_Fields::__event_Id => $target_event_id
        ];
        $where_statement = DatabaseHelper::where_statement_join_AND($field_value_array);
        $reply_array = DatabaseHelper::select_from_table(SessionReply_Fields::_, [], $where_statement);

        /* step 2 */
        /* filter out duplicated account id */
        $account_array = [];
        foreach ($reply_array as $reply) {
            $account_id = $reply[SessionReply_Fields::__creator_account_id];
            $account_array[$account_id] = [];
        }
        $account_id_array = [];
        foreach ($account_array as $account_id => $value) {
            $account_id_array[] = $account_id;
        }
        /* request account info */
        $pass_data = $data;
        $pass_data[APIFieldEnum::_id_array] = $account_id_array;
        $actor = new GetProfileListActor();
        $pass_result = $actor->handle($pass_data);
        /* fill the profile into reply list */
        foreach ($pass_result[APIFieldEnum::_element_array] as $profile) {
            $account_id = $profile[Account_Fields::__account_id];
            $account_array[$account_id] = $profile;
        }

        /* step 3 */
        foreach ($reply_array as &$reply) {
            $account_id = $reply[SessionReply_Fields::__creator_account_id];
            $reply[APIFieldEnum::_profile] = $account_array[$account_id];
        }

        $this->output[APIFieldEnum::_element_array] = $reply_array;
        return $this->output;
    }
}

addAPI(new GetSessionReplyListActor());
