<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetExhibitionListActor extends Actor
{
    public $name = "GetExhibitionList";
    public $params = [
        APIFieldEnum::_id_array => [1, 2, 3, 4, 5]
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of exhibition specified by client, used when scrolling or click 'show more' to avoid downloading too many (large) exhibition";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $id_array = $this->params[APIFieldEnum::_id_array];
        if (count($id_array) > 0) {
            $field_value_array = [];
            foreach ($id_array as $id) {
                $field_value_array[] = [
                    Exhibition_Fields::__event_id => $id
                ];
            }
            $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
        } else
            $where_statement = "";
        $result = DatabaseHelper::select_from_table(Exhibition_Fields::_, [], $where_statement);
        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetExhibitionListActor());
