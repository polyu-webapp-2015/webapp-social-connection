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
        /* array of message + profile(opposite) */
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Get inbox message of a given user, the array of 'message element' are message+profile";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $message_id_array = $this->params[APIFieldEnum::_id_array];

        $where_statement = "";
        {
            $from = Message_Fields::__from_account_id;
            $to = Message_Fields::__to_account_id;
            $where_statement = "WHERE ( $from = $account_id OR $to = $account_id )";
        }

        $N_msg_id = count($message_id_array);
        if ($N_msg_id > 0) {
            $extra_where_statement = Message_Fields::_ . '.' . Message_Fields::__msg_id . "=" . $message_id_array[0];
            for ($i = 1; $i < $N_msg_id; $i++) {
                $extra_where_statement .= " OR " . Message_Fields::_ . '.' . Message_Fields::__msg_id . '=' . $message_id_array[$i];
            }
            $where_statement = "$where_statement AND ($extra_where_statement)";
        }
        $msg_row_array = DatabaseHelper::select_from_table(Message_Fields::_, [], $where_statement);

        /* convert the message to client required format */
        /* 1. resolve opposite account id */
        /* 2. group message by opposite account id */
        /* 3. get profile of each opposite account */
        /* 4. wrap messages into profile items */

        /* step 1+2 */
        $account_id_array = [];
        /* key : account id */
        /* value : message array */
        $opposite_message_map = [];
        foreach ($msg_row_array as $msg_row) {
            $opposite_account_id = $msg_row[Message_Fields::__from_account_id] == $account_id ? $msg_row[Message_Fields::__to_account_id] : $msg_row[Message_Fields::__from_account_id];
            $opposite_account_id=ltrim($opposite_account_id,'0');
            $account_id_array[] = $opposite_account_id;
            if (array_key_exists($opposite_account_id, $opposite_message_map))
                $opposite_message_map[$opposite_account_id][] = $msg_row;
            else
                $opposite_message_map[$opposite_account_id] = [$msg_row];
        }

        /* step 3+4 */
        $profile_array = [];
        /* key : account id */
        /* value : [profile, message_array] */
        $opposite_profile_and_message_array = [];
        {
            $actor = new GetProfileListActor();
            $pass_data = $data;
            $pass_data[APIFieldEnum::_id_array] = $account_id_array;
            $pass_result = $actor->handle($pass_data);
            $profile_array = $pass_result[APIFieldEnum::_element_array];
            foreach ($profile_array as $profile) {
                $opposite_account_id = $profile[Account_Fields::__account_id];
                $opposite_account_id=ltrim($opposite_account_id,'0');
                $opposite_profile_and_message_array[$opposite_account_id] = [
                    APIFieldEnum::_profile => $profile,
                    APIFieldEnum::_element_array => $opposite_message_map[$opposite_account_id]
                ];
                log_object_from_named($opposite_message_map,"full map");
                log_object_from_named($opposite_message_map[$opposite_account_id],"map value of $opposite_account_id");
            }
        }

        $this->output[APIFieldEnum::_element_array] = $opposite_profile_and_message_array;
        return $this->output;
    }
}

addAPI(new GetMessageListActor());
