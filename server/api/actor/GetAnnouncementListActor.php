<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetAnnouncementListActor extends Actor
{
    public $name = "GetAnnouncementList";
    public $params = [
        APIFieldEnum::_ID_Array => [1, 2, 3, 4, 5]
    ];
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success,
        APIFieldEnum::_Announcement_Array => [],
    ];
    public $desc = "Get list of announcement specified by client, used when scrolling or click 'show more' to avoid downloading too many (large) announcement";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $id_array = $this->params[APIFieldEnum::_ID_Array];
        $field_value_array = [];
        foreach ($id_array as $id) {
            $field_value_array[] = [
                Announcement_Fields::__announcement_id => $id
            ];
        }
        $where_statement = DatabaseHelper::where_statement_join_OR($field_value_array);
        $result = DatabaseHelper::select_from_table(Announcement_Fields::_, [], $where_statement);
        $this->output[APIFieldEnum::_Announcement_Array] = $result;
        return $this->output;
    }
}

addAPI(new GetAnnouncementListActor());
