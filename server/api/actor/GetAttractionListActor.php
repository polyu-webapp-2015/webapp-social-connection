<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetAttractionListActor extends Actor
{
    public $name = "GetAttractionList";
    public $params = [
        APIFieldEnum::_id_array => [1, 2, 3, 4, 5]
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of attraction specified by client, used when scrolling or click 'show more' to avoid downloading too many (large) attraction";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);

        $pass_data = $data;
        $pass_data[APIFieldEnum::_id_array] = $this->params[APIFieldEnum::_id_array];
        $pass_data[Event_Fields::__event_type] = event_type_Enum::__A;
        $actor = new GetEventListActor();
        $result = $actor->handle($pass_data);

        $this->output[APIFieldEnum::_element_array] = $result[APIFieldEnum::_element_array];
        return $this->output;
    }
}

addAPI(new GetAttractionListActor());
