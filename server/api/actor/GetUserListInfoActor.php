<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetUserListInfoActor extends Actor
{
    public $name = "GetUserListInfo";
    public $params = array(
//        APIFieldEnum::_Session_ID => "t63slq6a340mo41rppmkvce5l4",
        APIFieldEnum::_ID_Array => [1, 23, 43],
        APIFieldEnum::_User_Info_Array => [
            User_Fields::__first_name,
            User_Fields::__last_name,
            User_Fields::__title_id
        ]
    );
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success,
        APIFieldEnum::_User_Array => []
    ];
    public $desc = "Fetch User(s) Info";

    public function handle($data)
    {
        ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $user_id_array = $this->params[APIFieldEnum::_ID_Array];
        $user_info_array = $this->params[APIFieldEnum::_User_Info_Array];
        $user_info_array[] = User_Fields::__account_id;
        $this->output[APIFieldEnum::_User_Array] = [];
        $table_name = User_Fields::_;
        $select_array = $user_info_array;
        $user_id_array = array_map(function ($user_id) {
            return [User_Fields::__account_id => $user_id];
        }, $user_id_array);
        $where_statement = DatabaseHelper::where_statement_join_OR($user_id_array);
        $rows = DatabaseHelper::select_from_table($table_name, $select_array, $where_statement);
        $user_array = array_map(function ($user_query_row) use ($user_info_array) {
            return array_filter_by_keys($user_query_row, $user_info_array);
        }, $rows);
        $this->output[APIFieldEnum::_User_Array] = $user_array;
        return $this->output;
    }
}

addAPI(new GetUserListInfoActor());
