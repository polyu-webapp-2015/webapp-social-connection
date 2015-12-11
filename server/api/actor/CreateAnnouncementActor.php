<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class CreateAnnouncementActor extends Actor
{
    public $name = "CreateAnnouncement";
    public $params = array(
        Announcement_Fields::__subject => "Extreme Weather Arrangement",
        Announcement_Fields::__description => "Due to the Black Rain Warnning, All Exhibition tonight will be cancelled. We apology for any inconvenience caused"
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success,
        Announcement_Fields::__announcement_id=>123
    ];
    public $desc = "create announcement, this is only allowed to admin and helper";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $account_type = DatabaseOperator::getAccountType($account_id);
        if ($account_type != account_type_Enum::__admin && $account_type != account_type_Enum::__helper)
            throw new Exception("This user ($account_type) cannot create Announcement", ResultCodeEnum::_No_Permission);
        $field_array = array_filter_by_keys($data, [
            Announcement_Fields::__subject,
            Announcement_Fields::__description
        ]);
        DatabaseHelper::table_insert(Announcement_Fields::_, $field_array);
        $id=DatabaseHelper::$_pdo->lastInsertId();
        log_object_from_named($id,"new announcement id");
        $this->output[Announcement_Fields::__announcement_id]=$id;
        return $this->output;
    }
}

addAPI(new CreateAnnouncementActor());
