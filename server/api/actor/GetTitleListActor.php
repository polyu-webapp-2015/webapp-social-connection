<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetTitleListActor extends Actor
{
    public $name = "GetTitleList";
    public $params = array(
        APIFieldEnum::_id_array => []
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all Title";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $id_array = $data[APIFieldEnum::_id_array];
        if (count($id_array) > 0) {
            $field_value_array = array_map(function ($id) {
                return [Title_Fields::__title_id => $id];
            }, $id_array);
            $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
            $title_array = DatabaseHelper::select_from_table(Title_Fields::_, [], $where_statement);
        } else
            $title_array = DatabaseHelper::select_all_from_table(Title_Fields::_);
        $this->output[APIFieldEnum::_element_array] = $title_array;
        return $this->output;
    }
}

addAPI(new GetTitleListActor());
