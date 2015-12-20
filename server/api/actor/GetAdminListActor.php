<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetAdminListActor extends Actor
{
    public $name = "GetAdminList";
    public $params = array(
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all User Full Info (profile), including organization";

    public function handle($data)
    {
        $requester_account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        $pass_data=$data;
        $pass_data[APIFieldEnum::_id_array]=[];
        $actor=new GetProfileListActor();
        $pass_result=$actor->handle($pass_data);
        $profile_full_array=$pass_result[APIFieldEnum::_element_array];

        $profile_array=[];
        foreach($profile_full_array as $profile){
            if($profile[Account_Fields::__account_type]==account_type_Enum::__admin)
                $profile_array[]=$profile;
        }

        $this->output[APIFieldEnum::_element_array] = $profile_array;
        return $this->output;
    }
}

addAPI(new GetAdminListActor());
