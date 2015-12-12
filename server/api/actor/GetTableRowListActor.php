<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetTableRowListActor extends Actor
{
    public $name = "GetTableRowList";
    public $params = [
        APIFieldEnum::_table_name => User_Fields::_
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get table rows";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $table_name=$this->params[APIFieldEnum::_table_name];
//        $id_array = $this->params[APIFieldEnum::_id_array];
//        if (count($id_array) > 0) {
//            $field_value_array = [];
//            foreach ($id_array as $id) {
//                $field_value_array[] = [
//                    TableRow_Fields::__event_id => $id
//                ];
//            }
//            $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
//        } else
//            $where_statement = "";
        $result = DatabaseHelper::select_from_table($table_name);
        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetTableRowListActor());
