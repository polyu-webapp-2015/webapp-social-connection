<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetAnnouncementListActor extends Actor
{
    public $name = "GetAnnouncementList";
    public $params = [
        APIFieldEnum::_id_array => [1, 2, 3, 4, 5]
    ];
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of announcement specified by client, used when scrolling or click 'show more' to avoid downloading too many (large) announcement";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $id_array = $this->params[APIFieldEnum::_id_array];
        $field_value_array = [];
        foreach ($id_array as $id) {
            $field_value_array[] = [
                Announcement_Fields::__announcement_id => $id
            ];
        }
        $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
        $result = DatabaseHelper::select_from_table(Announcement_Fields::_, [], $where_statement);
        $this->output[APIFieldEnum::_element_array] = $result;
        return $this->output;
    }
}

addAPI(new GetAnnouncementListActor());
