<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * @deprecated duplicated with AddTableRowList
 */
class CreateTableRowListActor extends Actor
{
    public $name = "CreateTableRowList";
    public $params = [
        APIFieldEnum::_table_name => User_Fields::_,
        APIFieldEnum::_element_array => [
            Message_Fields::__from_account_id => 123,
            Message_Fields::__to_account_id => 321
        ]
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_latest_id => 123,
    ];
    public $desc = "Create one row on the table";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $table_name = $this->params[APIFieldEnum::_table_name];
        $field_value_array = $this->params[APIFieldEnum::_element_array];
        $result = DatabaseHelper::table_insert($table_name, $field_value_array);
        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new CreateTableRowListActor());
