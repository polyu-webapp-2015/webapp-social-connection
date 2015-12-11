<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetLatestIdListActor extends Actor
{
    public $name = "GetLatestIdList";
    public $params = array(
        APIFieldEnum::_table_name_array => []
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        APIFieldEnum::_element_array => []
    ];
    public $desc = "Fetch largest ID of given tables";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $table_name_array = $data[APIFieldEnum::_table_name_array];
        $element_array = [];
        foreach ($table_name_array as $table_name) {
            $col_name = null;
            switch ($table_name) {
                case Account_Fields::_ :
                case User_Fields::_ :
                    $col_name = User_Fields::__account_id;
                    break;
                case Event_Fields::_ :
                case Exhibition_Fields::_ :
                case Session_Fields::_ :
                    $col_name = Event_Fields::__event_id;
                    break;
                case Announcement_Fields::_ :
                    $col_name = Announcement_Fields::__announcement_id;
                    break;
                default:
                    log_object_from_named("do not support Table $table_name", get_called_class());
            }
            if ($col_name != null) {
                $result = DatabaseHelper::select_from_table($table_name, ["MAX($col_name)"]);
                $latest_id = array_replace_key_by_order($result[0])[0];
                if ($latest_id == null)
                    $latest_id = -1;
                $element_array[] = [
                    APIFieldEnum::_table_name => $table_name,
                    APIFieldEnum::_latest_id => $latest_id
                ];
            }
        }
        $this->output[APIFieldEnum::_element_array] = $element_array;
        return $this->output;
    }
}

addAPI(new GetLatestIdListActor());
