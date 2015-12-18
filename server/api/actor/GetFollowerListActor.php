<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetFollowerListActor extends Actor
{
    public $name = "GetFollowerList";
    public $params = [];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of user that following the requester";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        /* get list of followed profile */
        /* 1. resolve list of account id that followed by the requester */
        /* 2. get their profile */

        /* step 1 */
        $account_id_array = [];
        {
            $table_name = Follow_Fields::_;
            $matched_field = Follow_Fields::__followed_account_id;
            $selected_field = Follow_Fields::__follower_account_id;
            $sql = "SELECT $selected_field FROM $table_name WHERE $matched_field=$account_id";
            $rows = DatabaseHelper::query($sql);
            foreach ($rows as $row) {
                $account_id_array[] = $row[$selected_field];
            }
        }
        if (count($account_id_array) == 0)
            return $this->output;

        /* step 2 */
        $actor = new GetProfileListActor();
        $pass_data = $data;
        $pass_data[APIFieldEnum::_id_array] = $account_id_array;
        $pass_result = $actor->handle($pass_data);

        $this->output[APIFieldEnum::_element_array] = $pass_result[APIFieldEnum::_element_array];
        return $this->output;
    }
}

addAPI(new GetFollowerListActor());
