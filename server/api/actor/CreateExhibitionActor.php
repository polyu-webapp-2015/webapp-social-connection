<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class CreateExhibitionActor extends Actor
{
    public $name = "CreateExhibition";
    public $params = array(
        Event_Fields::__venue_id => 123,
        Event_Fields::__event_time => '2015-12-09 20:25:21',
        Event_Fields::__subject => "Eco-friendly Hotel in Asia",
        Event_Fields::__description => "This Exhibition display about the eco-friendly hotels in Asia. ...",
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        Event_Fields::__event_id => 123
    ];
    public $desc = "create conference Exhibition, this is only allowed to admin and helper";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $account_type = DatabaseOperator::getAccountType($account_id);
        if ($account_type != account_type_Enum::__admin && $account_type != account_type_Enum::__helper)
            throw new Exception("This user ($account_type) cannot create Announcement", ResultCodeEnum::_No_Permission);
        /* create Event */
        $field_array = array_filter_by_keys($data, [
            Event_Fields::__venue_id,
            Event_Fields::__event_time,
            Event_Fields::__subject,
            Event_Fields::__description
        ]);
        $field_array[Event_Fields::__event_type] = event_type_Enum::__E;
        $field_array[Event_Fields::__creator_account_id] = $account_id;
        $field_array[Event_Fields::__editor_account_id] = $account_id;
        $result = DatabaseHelper::table_insert(Event_Fields::_, $field_array);
        $event_id = DatabaseHelper::$_pdo->lastInsertId();
        log_object_from_named($event_id, "new Event id");
        /* create Conference Exhibition */
        $field_array = [];
        $field_array[Exhibition_Fields::__event_id] = $event_id;
        DatabaseHelper::table_insert(Exhibition_Fields::_, $field_array);
//        $event_id = DatabaseHelper::$_pdo->lastInsertId();
        log_object_from_named($event_id, "new Exhibition id");
        $this->output[Event_Fields::__event_id] = $event_id;
        return $this->output;
    }
}

addAPI(new CreateExhibitionActor());
