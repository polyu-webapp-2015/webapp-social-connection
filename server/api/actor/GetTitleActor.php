<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetTitleActor extends Actor
{
    public $name = "GetTitle";
    public $params = array();
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch all Title";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        $title_array = DatabaseHelper::select_all_from_table(Title_Fields::_);
        $this->output[APIFieldEnum::_element_array] = $title_array;
        return $this->output;
    }
}

addAPI(new GetTitleActor());
