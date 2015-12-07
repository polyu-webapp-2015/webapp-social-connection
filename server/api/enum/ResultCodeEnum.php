<?php
class ResultCodeEnum
{
    const _ = "ResultCode";
    const _Success = "Success";
    const _Server_Unknown_Error = "Server_Unknown_Error";
    const _Server_Config_Error = "Server_Config_Error";
    const _Unknown_API = "Unknown_API";
    const _Unknown_Database_Error = "Unknown_Database_Error";
    const _Failed_To_Connect_To_Database = "Failed_To_Connect_To_Database";
    const _Failed_To_Query_On_Database = "Failed_To_Query_On_Database";
    const _Failed_To_Insert_On_Database = "Failed_To_Insert_On_Database";
    const _Database_Corrupt = "Database_Corrupt";
    const _Network_Not_Stable = "Network_Not_Stable";
    const _Duplicated = "Duplicated";
    const _User_Not_Exist = "User_Not_Exist";
    const _Password_Wrong = "Password_Wrong";
    const _No_Permission = "No_Permission";
    const _Group_Not_Exist = "Group_Not_Exist";
    const _Request_Body_Wrong_Type = "Request_Body_Wrong_Type";
    const _Request_Param_Missing = "Request_Param_Missing";
    const _Request_Param_Enum_Invalid = "Request_Param_Enum_Invalid";
    const _Request_Param_Wrong_Format = "Request_Param_Wrong_Format";
    const _Request_Param_Parsing_Server = "Request_Param_Parsing_Server";
}
