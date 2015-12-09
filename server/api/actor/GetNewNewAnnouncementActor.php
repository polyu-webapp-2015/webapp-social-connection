<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetNewAnnouncementActor extends Actor
{
    public $name = "GetNewAnnouncement";
    public $params = array();
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success,
        APIFieldEnum::_New_Array => [],
        APIFieldEnum::_Old_Array => []
    ];
    public $desc = "create announcement, this is only allowed to admin and helper";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        /* get all announcement */
        /* get  */
        $field_value_array = array_filter_by_keys($data, [
            Announcement_Fields::__subject,
            Announcement_Fields::__description
        ]);
        //TODO
        DatabaseHelper::table_insert(Announcement_Fields::_, $field_value_array);
        return $this->output;
    }
}

addAPI(new GetNewAnnouncementActor());
