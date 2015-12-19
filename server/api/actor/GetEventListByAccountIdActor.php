<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetEventListByAccountIdActor extends Actor
{
    public $name = "GetEventListByAccountId";
    public $params = [
        Account_Fields::__account_id => 123,
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of event of that the given user has join ";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        $target_account_id = $this->params[Account_Fields::__account_id];
        if ($target_account_id == -1)
            $target_account_id = $account_id;

        /* get rich event list */
        /* 1. get matched event list */
        /* 2. get number of user joined that event */

        $param_array = [
            ':' . Account_Fields::__account_id => $target_account_id
        ];
        $event_array = DatabaseHelper::get_prepare_and_execute('get_event_by_account_id.sql', $param_array);

        foreach ($event_array as &$event) {
            $event_id = $event[Event_Fields::__event_id];
            $join_time = DatabaseOperator::getUserJoinEventTime($account_id, $event_id);
            $event[APIFieldEnum::_joined] = $join_time != false;
            $event[APIFieldEnum::_join_time] = $join_time;
        }

        $this->output[APIFieldEnum::_element_array] = $event_array;
        return $this->output;
    }
}

addAPI(new GetEventListByAccountIdActor());
