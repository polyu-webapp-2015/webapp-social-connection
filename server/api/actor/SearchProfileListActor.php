<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class SearchProfileListActor extends Actor
{
    public $name = "SearchProfileList";
    public $params = array(
        User_Fields::__city => "Hong Kong",
        User_Fields::__country => "China",
        APIFieldEnum::_name => "Chan",
        User_Fields::__organization => "FM"
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all User Full Info (profile), including organization";

    static function clean($string)
    {
        if ($string == null)
            return '';
        $string = str_replace(' ', '-', $string);
        $string = preg_replace('/[^A-Za-z0-9\-]/', '', $string);
        $string = preg_replace('/-+/', '-', $string);
        return str_replace('-', ' ', $string);
    }

    public function handle($data)
    {
//        log_object_from_named($data, "get profile list actor, data");
        $requester_account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        $city = self::clean($this->params[User_Fields::__city]);
        $country = self::clean($this->params[User_Fields::__country]);
        $name = self::clean($this->params[APIFieldEnum::_name]);
        $organization = self::clean($this->params[User_Fields::__organization]);

        if ($city == "" && $country == "" && $name == "" && $organization == "")
            return $this->output;

        /* get rich profile list */
        /* 1. find matched profile list */
        /* 2. get following relationship for each profile against the requester */

        /* step 1 */
        $search_text = $this->params[APIFieldEnum::_search_text];
        $search_text_array = explode(' ', $search_text);
        $N_search_text = count($search_text_array);
        if ($N_search_text == 0)
            return $this->output;
        $where_statement = "";

        if ($city != '')
            $where_statement .= " AND " . User_Fields::__city . " LIKE '%" . $city . "%'";
        if ($country != '')
            $where_statement .= " AND " . User_Fields::__country . " LIKE '%" . $country . "%'";
        if ($organization != '')
            $where_statement .= " AND " . User_Fields::__organization . " LIKE '%" . $organization . "%'";
        if ($name != '') {
            $k1 = User_Fields::__first_name;
            $k2 = User_Fields::__last_name;
            $where_statement .= " AND ( $k1 LIKE '%$name%' OR $k2 LIKE '%$name%' )";
        }

        $where_statement = "WHERE " . substr($where_statement, 4);
        log_object_from_named($where_statement, get_called_class() . " where statement");
        $profile_array = DatabaseHelper::select_from_table(User_Fields::_, [], $where_statement);

        /* step 2 */
        foreach ($profile_array as &$profile) {
            $opposite_account_id = $profile[Account_Fields::__account_id];
            $followed = DatabaseOperator::isFollowing($requester_account_id, $opposite_account_id);
            $following = DatabaseOperator::isFollowing($opposite_account_id, $requester_account_id);
            $profile[APIFieldEnum::_followed] = $followed;
            $profile[APIFieldEnum::_following] = $following;
        }

        $this->output[APIFieldEnum::_element_array] = $profile_array;
        return $this->output;
    }
}

addAPI(new SearchProfileListActor());
