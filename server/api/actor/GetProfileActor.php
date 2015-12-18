<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetProfileActor extends Actor
{
    public $name = "GetProfile";
    public $params = array(
        APIFieldEnum::_id_array => []
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Get Profile of the requester";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data,$this->params);

        $actor=new GetProfileListActor();
        $pass_data=$data;
        $pass_data[APIFieldEnum::_id_array]=[$account_id];
        $pass_result=$actor->handle($pass_data);

        $this->output[APIFieldEnum::_element_array] = $pass_result[APIFieldEnum::_element_array];
        return $this->output;
    }
}

addAPI(new GetProfileActor());
