<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetProfileActor extends Actor
{
    public $name = "GetProfile";
    public $params = array(
        User_Fields::__account_id => 123
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_profile => []
    ];
    public $desc = "Fetch all User Info";

    const _User_Info_Array = [
        User_Fields::__account_id,
        User_Fields::__sex,
        User_Fields::__first_name,
        User_Fields::__last_name,
        User_Fields::__organization_id,
        User_Fields::__title_id,
        User_Fields::__city_id
    ];

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $pass_data = [
            APIFieldEnum::_id_array => [$account_id],
            APIFieldEnum::_User_Info_Array => self::_User_Info_Array
        ];
        $actor = new GetUserListInfoActor();
        $pass_output = $actor->handle($pass_data);
        $this->output[APIFieldEnum::_result_code] = $pass_output[APIFieldEnum::_result_code];
        $this->output[APIFieldEnum::_profile] = $pass_output[APIFieldEnum::_User_Array][0];
        return $this->output;
    }
}

addAPI(new GetProfileActor());
