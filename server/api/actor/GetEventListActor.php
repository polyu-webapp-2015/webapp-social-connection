<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetEventListActor extends Actor
{
    public $name = "GetEventList";
    public $params = [
        APIFieldEnum::_id_array => [1, 2, 3, 4, 5],
        Event_Fields::__event_type=>event_type_Enum::__A
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of event of given event type, this is internal API";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $event_id_array = $this->params[APIFieldEnum::_id_array];

        $where_statement = "";
        {
            $field=Event_Fields::__event_type;
            $value=$this->params[Event_Fields::__event_type];
            $where_statement = "WHERE ( $field = $value )";
        }

        $N_event_id = count($event_id_array);
        if ($N_event_id > 0) {
            $extra_where_statement = Message_Fields::_ . '.' . Message_Fields::__msg_id . "=" . $event_id_array[0];
            for ($i = 1; $i < $N_event_id; $i++) {
                $extra_where_statement .= " OR " . Message_Fields::_ . '.' . Message_Fields::__msg_id . '=' . $event_id_array[$i];
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
                $opposite_profile_and_message_array[] = [
                    APIFieldEnum::_profile => $profile,
                    APIFieldEnum::_element_array => $opposite_message_map[$opposite_account_id]
                ];
                log_object_from_named($opposite_message_map,"full map");
                log_object_from_named($opposite_message_map[$opposite_account_id],"map value of $opposite_account_id");
            }
        }

        $this->output[APIFieldEnum::_element_array] = $opposite_profile_and_message_array;
        return $this->output;


















        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $id_array = $this->params[APIFieldEnum::_id_array];
        if (count($id_array) > 0) {
            $field_value_array = [];
            foreach ($id_array as $id) {
                $field_value_array[] = [
                    Event_Fields::__event_id => $id
                ];
            }
            $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
        } else
            $where_statement = "";
        $result = DatabaseHelper::select_from_table(Event_Fields::_, [], $where_statement);
        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetEventListActor());
