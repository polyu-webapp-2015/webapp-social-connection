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
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => [],
    ];
    public $desc = "Get list of new announcement that the user has not read (query) before";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $sql1 = DatabaseHelper::get_prepared_statement("get_new_announcement.sql");
        $sql2 = DatabaseHelper::get_prepared_statement("update_read_announcement_datetime.sql");
        $statement1 = DatabaseHelper::prepare($sql1);
        $statement2 = DatabaseHelper::prepare($sql2);
        $param_array = [
            ":" . User_Fields::__account_id => $account_id
        ];
        $result1 = DatabaseHelper::execute($statement1, $param_array);
        $result2 = DatabaseHelper::execute($statement2, $param_array);
        $this->output[APIFieldEnum::_element_array] = $result1;
        return $this->output;
    }
}

addAPI(new GetNewAnnouncementActor());
