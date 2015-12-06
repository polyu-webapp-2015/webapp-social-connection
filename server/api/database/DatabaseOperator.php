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
        //testing start

//        log_object(DatabaseHelper::get_table_field_array("User"));

        //testing end
        $select_array = [Account_Fields::__account_id];
        $where_statement = DatabaseHelper::where_statement_join_OR([
            [Account_Fields::__email, quote($emailOrPhoneNum)],
            [Account_Fields::__phone_num, quote($emailOrPhoneNum)]
        ]);
        $rows = DatabaseHelper::select_from_table(Account_Fields::_, $select_array, $where_statement);
        if (count($rows) > 0 & array_key_exists(Account_Fields::__account_id, $rows[0]))
            return $rows[0][Account_Fields::__account_id];
        else
            return false;
    }

    public static function isPasswordCorrect($emailOrPhoneNum, $password)
    {

    }
}