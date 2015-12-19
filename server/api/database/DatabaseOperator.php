<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 * Date: 12/6/15
 * Time: 5:38 PM
 */
class DatabaseOperator
{
    const __emailOrPhoneNum = "emailOrPhoneNum";

    /**
     * @deprecate avoid logic on db site
     * @param string $emailOrPhoneNum
     * @return bool
     */
    public static function is_email($emailOrPhoneNum)
    {
        return strpos('@', $emailOrPhoneNum) != false;
    }

    public static function findAccountId($emailOrPhoneNum)
    {
        $select_array = [Account_Fields::__account_id];
        $where_statement = DatabaseHelper::where_statement_join_OR([
            [Account_Fields::__email => DatabaseHelper::quote($emailOrPhoneNum)],
            [Account_Fields::__phone_num => DatabaseHelper::quote($emailOrPhoneNum)]
        ]);
        $rows = DatabaseHelper::select_from_table(Account_Fields::_, $select_array, $where_statement);
        if (count($rows) > 0 && array_key_exists(Account_Fields::__account_id, $rows[0]))
            return $rows[0][Account_Fields::__account_id];
        else
            return false;
    }

    public static function isPasswordCorrect($emailOrPhoneNum, $password)
    {
        $emailOrPhoneNum = DatabaseHelper::quote($emailOrPhoneNum);
        $password = DatabaseHelper::quote($password);
        $select_array = [Account_Fields::__account_id];
        $where_options1 = [];
        $where_options1[] = DatabaseHelper::field_value_to_statement([
            Account_Fields::__password => $password
        ]);
        $where_options2 = [];
        DatabaseHelper::logical_statement_join($where_options2, DatabaseHelper::__OR, [
            Account_Fields::__email => $emailOrPhoneNum,
            Account_Fields::__phone_num => $emailOrPhoneNum
        ]);
        $where_options1[] = DatabaseHelper::__AND;
        $where_options1[] = "(";
        foreach ($where_options2 as $item)
            $where_options1[] = $item;
        $where_options1[] = ")";
        $where_statement = DatabaseHelper::logical_statement_collection_to_where_statement($where_options1);
        $rows = DatabaseHelper::select_from_table(Account_Fields::_, $select_array, $where_statement);
        if (count($rows) > 0 && array_key_exists(Account_Fields::__account_id, $rows[0]))
            return $rows[0][Account_Fields::__account_id];
        else
            return false;
    }

    /**
     * @param string $user_id
     * @return string : account_type (Enum) value
     * @throws Exception
     */
    public static function getAccountType($user_id)
    {
        $sql = DatabaseHelper::get_prepared_statement("get_user_type.sql");
        $statement = DatabaseHelper::prepare($sql);
        if ($statement->execute([$user_id])) {
            return $statement->fetch()[Account_Fields::__account_type];
        } else {
            $msg = ErrorResponse::generate_pdo_error_msg("Failed to get user type");
            throw new Exception($msg, ResultCodeEnum::_Failed_To_Query_On_Database);
        }
    }

    public static function getUserOrganization($user_id)
    {
        $sql = DatabaseHelper::get_prepared_statement("get_user_organization.sql");
        $statement = DatabaseHelper::prepare($sql);
        if ($statement->execute([$user_id])) {
            return $statement->fetch()[User_Fields::__organization_id];
        } else {
            $msg = ErrorResponse::generate_pdo_error_msg("Failed to get user type");
            throw new Exception($msg, ResultCodeEnum::_Failed_To_Query_On_Database);
        }
    }

    /**
     * @param int $source_account_id
     * @param int $dest_account_id
     * @return boolean true if $source_account_id is following the $dest_account_id, false otherwise
     * @remark will ignore deleted relationships
     */
    public static function isFollowing($source_account_id, $dest_account_id)
    {
        $table_name = Follow_Fields::_;
        $follower = Follow_Fields::__follower_account_id;
        $followed = Follow_Fields::__followed_account_id;
        $deleted = Follow_Fields::__deleted;
        $sql = "SELECT COUNT(*) AS result FROM $table_name WHERE $follower = $source_account_id AND $followed = $dest_account_id AND $deleted = FALSE ";
        $result = DatabaseHelper::query($sql);
        return $result[0]['result'] != 0;
    }

    public static function isUserJoinEvent($account_id, $event_id)
    {
        $table_name = Event_Attendee_Fields::_;
        $event_id_field = Event_Attendee_Fields::__event_id;
        $account_id_field = Event_Attendee_Fields::__account_id;
        $sql = "SELECT COUNT(*) AS result FROM $table_name WHERE $event_id_field = $event_id AND $account_id_field = $account_id";
        $result = DatabaseHelper::query($sql);
        return $result[0]['result'] != 0;
    }

    /**
     * @param $account_id
     * @param $event_id
     * @return string|bool if the join time is found, return the join time
     *   return false if the user has not join the event
     * @throws Exception
     */
    public static function getUserJoinEventTime($account_id, $event_id)
    {
        $table_name = Event_Attendee_Fields::_;
        $event_id_field = Event_Attendee_Fields::__event_id;
        $account_id_field = Event_Attendee_Fields::__account_id;
        $select_field = Event_Fields::__create_time;
        $sql = "SELECT $select_field FROM $table_name WHERE $event_id_field = $event_id AND $account_id_field = $account_id";
        $result = DatabaseHelper::query($sql);
        if (count($result) > 0)
            return $result[0][$select_field];
        else
            return false;
    }

    public static function getEventUserCount($event_id)
    {
        $param_array = [
            Event_Fields::__event_id => $event_id
        ];
        $result = DatabaseHelper::get_prepare_and_execute('get_event_user_count.sql', $param_array);
        if (count($result) == 0)
            throw new Exception("Failed to get number of user on an event", ResultCodeEnum::_Failed_To_Query_On_Database);
        else
            return $result[0]['result'];
    }
}