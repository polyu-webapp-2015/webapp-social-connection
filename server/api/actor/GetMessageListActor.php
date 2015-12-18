<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetMessageListActor extends Actor
{
    public $name = "GetMessageList";
    public $params = array(
        /* account id */
//        APIFieldEnum::_id=>"123",
        /* message id */
        APIFieldEnum::_id_array => []
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        /* array of message + profile */
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Get inbox message of a given user, the array of 'message element' are message+profile";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $message_id_array = $this->params[APIFieldEnum::_id_array];

        $where_statement = "WHERE (" . Message_Fields::_ . "." . Message_Fields::__from_account_id . " = " . $account_id . ")";
        $N_msg_id = count($message_id_array);
        if ($N_msg_id > 0) {
            $extra_where_statement = Message_Fields::_ . '.' . Message_Fields::__msg_id . "=" . $message_id_array[0];
            for ($i = 1; $i < $N_msg_id; $i++) {
                $extra_where_statement .= " OR " . Message_Fields::_ . '.' . Message_Fields::__msg_id . '=' . $message_id_array[$i];
            }
            $where_statement = "$where_statement AND ($extra_where_statement)";
        }
        $result = DatabaseHelper::select_from_table(Message_Fields::_, [], $where_statement);

        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetMessageListActor());
