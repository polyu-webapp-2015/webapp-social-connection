<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class AddTableRowListActor extends Actor
{
    public $name = "AddTableRowList";
    public $params = [
        APIFieldEnum::_table_name => Message_Fields::_,
        APIFieldEnum::_element_array => [
            [
                Message_Fields::__from_account_id => 123,
                Message_Fields::__to_account_id => 321,
                Message_Fields::__msg_content => "Hi, nice to meet you, let's have lunch together"
            ],
            [
                Message_Fields::__from_account_id => 321,
                Message_Fields::__to_account_id => 123,
                Message_Fields::__msg_content => "Sure, see you soon"
            ]
        ]
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_id_array => [],
    ];
    public $desc = "Add table rows";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $table_name = $this->params[APIFieldEnum::_table_name];
        $element_array = $this->params[APIFieldEnum::_element_array];
        $id_array = [];
        log_object_from_named("trying to add table rows", get_called_class());
        foreach ($element_array as $field_value_array) {
             log_object_from_named($field_value_array, get_called_class()."the field_value_array");
            $result = DatabaseHelper::table_insert($table_name, $field_value_array);
            $last_id = DatabaseHelper::lastInsertId();
            if (is_string($last_id))
                $id_array[] = DatabaseHelper::lastInsertId();
            else
                log_object_from_named($last_id, get_called_class() . ": Failed to insert into table?");
        }
        $this->output[APIFieldEnum::_id_array] = $id_array;
        return $this->output;
    }
}

addAPI(new AddTableRowListActor());
