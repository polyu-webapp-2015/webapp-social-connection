<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetProfileListActor extends Actor
{
    public $name = "GetProfileList";
    public $params = array(
        APIFieldEnum::_id_array => []
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all User Full Info (profile), including organization";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $account_id_array = $this->params[APIFieldEnum::_id_array];
        $sql = DatabaseHelper::get_prepared_statement('get_profile.sql');
        if (count($account_id_array) > 0) {
            $field_value_array = [];
            foreach ($account_id_array as $account_id) {
                $field_value_array[] = [User_Fields::__account_id => $account_id];
            }
            $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
            $sql = "$sql $where_statement";
        }
        $result = DatabaseHelper::query($sql);
        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetProfileListActor());
