<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 11/18/15
 * Time: 11:45 AM
 */
class CreateMessageActor extends Actor
{
    public $name = "CreateMessage";
    public $params = array(
        Message_Fields::__to_account_id => 123,
        Message_Fields::__msg_content => "Hi, nice to meet you"
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_latest_id => 123
    ];
    public $desc = "send message to another user";

    public function handle($data)
    {
        $sender_account_id = ActorUtil::check_session_valid($data);
        $receiver_account_id = $this->params[Message_Fields::__to_account_id];
        if ($sender_account_id == $receiver_account_id)
            throw new Exception("The message receiver is the sender", ResultCodeEnum::_Logic_Error);
        $field_value_array = [
            Message_Fields::__from_account_id => $sender_account_id,
            Message_Fields::__to_account_id => $receiver_account_id,
            Message_Fields::__msg_content => $this->params[Message_Fields::__msg_content]
        ];
        $result = DatabaseHelper::table_insert(Message_Fields::_, $field_value_array);
        $this->output[APIFieldEnum::_latest_id] = DatabaseHelper::lastInsertId();
        return $this->output;
    }
}

addAPI(new CreateMessageActor());
