<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetProfileListActor extends Actor
{
    public $name = "GetProfileList";
    public $params = array(
        APIFieldEnum::_id_array=>[]
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all User Full Info (profile), including organization";

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
            APIFieldEnum::_id_array => $this->params[APIFieldEnum::_id_array],
            APIFieldEnum::_field_array => self::_User_Info_Array
        ];
        $actor = new GetUserListInfoActor();
        $pass_output = $actor->handle($pass_data);
        $this->output[APIFieldEnum::_result_code] = $pass_output[APIFieldEnum::_result_code];
        $this->output[APIFieldEnum::_element_array] = $pass_output[APIFieldEnum::_element_array];
        return $this->output;
    }
}

addAPI(new GetProfileListActor());
