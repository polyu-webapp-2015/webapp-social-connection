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
        log_object_from_named($data, "get profile list actor, data");
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        /* get rich profile list */
        /* 1. get joint table info of profile */
        /* 2. get following relationship for each profile against the requester */

        /* step 1 */
        $account_id_array = $this->params[APIFieldEnum::_id_array];
        $sql = DatabaseHelper::get_prepared_statement('get_profile.sql');
        if (count($account_id_array) > 0) {
            $field_value_array = [];
            foreach ($account_id_array as $account_id) {
                $field_value_array[] = [User_Fields::_ . "." . User_Fields::__account_id => $account_id];
            }
            $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
            $sql = "$sql $where_statement";
        }
        $profile_array = DatabaseHelper::query($sql);

        /* step 2 */
//        $result=[];
//        foreach($profile_array as $profile){
//            $profile[]
//         $result[]=$profile;
//        }

        $this->output[APIFieldEnum::_element_array] = $profile_array;
        return $this->output;
    }
}

addAPI(new GetProfileListActor());
