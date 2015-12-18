<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetFollowedListActor extends Actor
{
    public $name = "GetFollowedList";
    public $params = [];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of user that followed by the requester";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        /* get list of followed profile */
        /* 1. resolve list of account id that followed by the requester */
        /* 2. get their profile */


        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetFollowedListActor());
