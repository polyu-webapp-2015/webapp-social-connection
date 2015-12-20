<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/18/15
 * Time: 11:45 AM
 */
class CreateSessionReplyActor extends Actor
{
    public $name = "CreateSessionReply";
    public $params = array(
        SessionReply_Fields::__event_id => 123,
        SessionReply_Fields::__message => "What is great session"
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_latest_id => 123,
        APIFieldEnum::_field_array => "the new message"
    ];
    public $desc = "create reply on the given session";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        $field_value_array = [
            SessionReply_Fields::__creator_account_id => $account_id,
            SessionReply_Fields::__editor_account_id => $account_id,
            SessionReply_Fields::__event_id => $this->params[SessionReply_Fields::__event_id],
            SessionReply_Fields::__message => $this->params[SessionReply_Fields::__message]
        ];
        DatabaseHelper::table_insert(SessionReply_Fields::_, $field_value_array);
        $lastInsertId = DatabaseHelper::lastInsertId();
        $this->output[APIFieldEnum::_latest_id] = $lastInsertId;
        $this->output[SessionReply_Fields::__message];
        $key = SessionReply_Fields::__reply_id;
        $this->output[APIFieldEnum::_field_array] = DatabaseHelper::select_from_table(SessionReply_Fields::_, [], "WHERE $key = $lastInsertId")[0];
        return $this->output;
    }
}

addAPI(new CreateSessionReplyActor());
