<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetAdminProfileListActor extends Actor
{
    public $name = "GetAdminProfileList";
    public $params = array(
        Event_Attendee_Fields::__event_id => 123
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all User Full Info (profile), including organization";

    public function handle($data)
    {
//        log_object_from_named($data, "get profile list actor, data");
        $requester_account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $event_id = $this->params[Event_Fields::__event_id];

        /* get rich profile list */
        /* 1. get account id list */
        /* 2. get joint table info of profile */
        /* 3. get following relationship for each profile against the requester */

        /* step 1 */
        $key = Event_Attendee_Fields::__event_id;
        $where_statement = "WHERE $key = $event_id";
        $rows = DatabaseHelper::select_from_table(Event_Attendee_Fields::_, [Event_Attendee_Fields::__account_id], $where_statement);
        $account_id_array=array_flatten($rows);
//        log_object_from_named($account_id_array, "Rows of account id");

        if(count($account_id_array)==0)
            return $this->output;

        /* step 2 */
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

        /* if getting self profile, skip following relationship info */
        if (!(count($profile_array) == 1 && $profile_array[0][Account_Fields::__account_id] == $requester_account_id)) {
            /* step 3 */
            foreach ($profile_array as &$profile) {
                $opposite_account_id = $profile[Account_Fields::__account_id];
                $followed = DatabaseOperator::isFollowing($requester_account_id, $opposite_account_id);
                $following = DatabaseOperator::isFollowing($opposite_account_id, $requester_account_id);
                $profile[APIFieldEnum::_followed] = $followed;
                $profile[APIFieldEnum::_following] = $following;
            }
        } else {
            log_object_from_named("skipped", "get profile list (follow)");
            log_object_from_named(count($profile_array), "profile length");
        }

        $this->output[APIFieldEnum::_element_array] = $profile_array;
        return $this->output;
    }
}

addAPI(new GetAdminProfileListActor());
