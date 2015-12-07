<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetUserListInfoActor extends Actor
{
    public $name = "GetUserListInfo";
    public $params = array(
        APIFieldEnum::_Session_ID => "t63slq6a340mo41rppmkvce5l4",
        APIFieldEnum::_User_ID_Array => [1, 23, 43],
        APIFieldEnum::_User_Info_Array => [
            User_Fields::__first_name,
            User_Fields::__last_name,
            User_Fields::__title_id
        ]
    );
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success,
        APIFieldEnum::_User_Info_Array => ''
    ];
    public $desc = "Fetch User(s) Info";

    public function handle($data)
    {
        ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $session_id = $this->params[APIFieldEnum::_Session_ID];
        $this->output[APIFieldEnum::_User_Info_Array] = $_SESSION[Account_Fields::__account_id];
        return $this->output;
    }
}

addAPI(new GetUserListInfoActor());
