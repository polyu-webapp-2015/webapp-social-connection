<?php

/** @remark this is auto-generated file, do not edit */
class ResultCodeEnum
{
    const _ = "ResultCode";
    const _Success = 0;
    const _Server_Unknown_Error = 1;
    const _Server_Config_Error = 2;
    const _Server_File_Missing = 3;
    const _Unknown_API = 4;
    const _Unknown_Database_Error = 5;
    const _Failed_To_Connect_To_Database = 6;
    const _Failed_To_Query_On_Database = 7;
    const _Failed_To_Insert_On_Database = 8;
    const _Failed_To_Update_On_Database = 9;
    const _Database_Corrupt = 10;
    const _Network_Not_Stable = 11;
    const _Duplicated = 12;
    const _User_Not_Exist = 13;
    const _Password_Wrong = 14;
    const _Session_Expired = 15;
    const _No_Permission = 16;
    const _Group_Not_Exist = 17;
    const _Request_Body_Wrong_Type = 18;
    const _Request_Param_Missing = 19;
    const _Request_Param_Enum_Invalid = 20;
    const _Request_Param_Wrong_Format = 21;
    const _Request_Param_Parsing_Server = 22;

    public static function getString($number)
    {
        if ($number == self::_Success) return "Success";
        if ($number == self::_Server_Unknown_Error) return "Server_Unknown_Error";
        if ($number == self::_Server_Config_Error) return "Server_Config_Error";
        if ($number == self::_Server_File_Missing) return "Server_File_Missing";
        if ($number == self::_Unknown_API) return "Unknown_API";
        if ($number == self::_Unknown_Database_Error) return "Unknown_Database_Error";
        if ($number == self::_Failed_To_Connect_To_Database) return "Failed_To_Connect_To_Database";
        if ($number == self::_Failed_To_Query_On_Database) return "Failed_To_Query_On_Database";
        if ($number == self::_Failed_To_Insert_On_Database) return "Failed_To_Insert_On_Database";
        if ($number == self::_Failed_To_Update_On_Database) return "Failed_To_Update_On_Database";
        if ($number == self::_Database_Corrupt) return "Database_Corrupt";
        if ($number == self::_Network_Not_Stable) return "Network_Not_Stable";
        if ($number == self::_Duplicated) return "Duplicated";
        if ($number == self::_User_Not_Exist) return "User_Not_Exist";
        if ($number == self::_Password_Wrong) return "Password_Wrong";
        if ($number == self::_Session_Expired) return "Session_Expired";
        if ($number == self::_No_Permission) return "No_Permission";
        if ($number == self::_Group_Not_Exist) return "Group_Not_Exist";
        if ($number == self::_Request_Body_Wrong_Type) return "Request_Body_Wrong_Type";
        if ($number == self::_Request_Param_Missing) return "Request_Param_Missing";
        if ($number == self::_Request_Param_Enum_Invalid) return "Request_Param_Enum_Invalid";
        if ($number == self::_Request_Param_Wrong_Format) return "Request_Param_Wrong_Format";
        if ($number == self::_Request_Param_Parsing_Server) return "Request_Param_Parsing_Server";
        return "Unknown";
    }
}
