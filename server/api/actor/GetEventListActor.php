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
        Event_Fields::__event_type => event_type_Enum::__A
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

        $sql = DatabaseHelper::get_prepared_statement('get_event.sql');
        $where_statement = "";
        {
            $field = Event_Fields::__event_type;
            $value = $this->params[Event_Fields::__event_type];
            $value=DatabaseHelper::quote($value);
            $where_statement = "WHERE ( $field = $value )";
        }

        $N_event_id = count($event_id_array);
        if ($N_event_id > 0) {
            $field = Event_Fields::__event_id;
            $extra_where_statement = "$field = " . $event_id_array[0];
            for ($i = 1; $i < $N_event_id; $i++) {
                $extra_where_statement = "$extra_where_statement OR $field = " . $event_id_array[$i];
            }
            $where_statement = "$where_statement AND ($extra_where_statement)";
        }

        $sql = "$sql $where_statement";
        $result = DatabaseHelper::query($sql);

        $this->output[APIFieldEnum::_element_array] = array_reverse($result);
        return $this->output;
    }
}

addAPI(new GetEventListActor());
