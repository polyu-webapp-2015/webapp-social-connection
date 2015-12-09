<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class GetAnnouncementActor extends Actor
{
    public $name = "GetAnnouncement";
    public $params = array(
        Announcement_Fields::__subject => "Extreme Weather Arrangement",
        Announcement_Fields::__description => "Due to the Black Rain Warnning, All Exhibition tonight will be cancelled. We apology for any inconvenience caused"
    );
    public $output = [
        APIFieldEnum::_ResultCode => ResultCodeEnum::_Success
    ];
    public $desc = "create announcement, this is only allowed to admin and helper";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $account_type = DatabaseOperator::getAccountType($account_id);
        if ($account_type != account_type_Enum::__admin && $account_type != account_type_Enum::__helper)
            throw new Exception("This user ($account_type) cannot create Announcement", ResultCodeEnum::_No_Permission);
        $field_value_array = array_filter_by_keys($data, [
            Announcement_Fields::__subject,
            Announcement_Fields::__description
        ]);
        //TODO
        DatabaseHelper::table_insert(Announcement_Fields::_, $field_value_array);
        return $this->output;
    }
}

addAPI(new GetAnnouncementActor());
