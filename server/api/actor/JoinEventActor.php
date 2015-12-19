<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class JoinEventActor extends Actor
{
    public $name = "JoinEvent";
    public $params = array(
        Event_Fields::__event_id => 123
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_latest_id => 12,
    ];
    public $desc = "indicate the requester user will join the event";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        $field_value_array = [
            Event_Attendee_Fields::__account_id => $account_id,
            Event_Attendee_Fields::__event_id => $this->params[Event_Fields::__event_id]
        ];
        try {
            DatabaseHelper::table_insert(Event_Attendee_Fields::_, $field_value_array);
            $this->output[APIFieldEnum::_latest_id] = DatabaseHelper::lastInsertId();
        } catch (Exception $exception) {
            /* the user has joint the event already */
        }

        return $this->output;
    }
}

addAPI(new JoinEventActor());
