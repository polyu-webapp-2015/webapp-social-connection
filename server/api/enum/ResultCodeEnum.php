<?php
class ResultCodeEnum
{
    const _ = "ResultCode";
  const _Success = 0;
  const _Server_Unknown_Error = 1;
  const _Server_Config_Error = 2;
  const _Unknown_API = 3;
  const _Unknown_Database_Error = 4;
  const _Failed_To_Connect_To_Database = 5;
  const _Failed_To_Query_On_Database = 6;
  const _Failed_To_Insert_On_Database = 7;
  const _Database_Corrupt = 8;
  const _Network_Not_Stable = 9;
  const _Duplicated = 10;
  const _User_Not_Exist = 11;
  const _Password_Wrong = 12;
  const _Session_Expired = 13;
  const _No_Permission = 14;
  const _Group_Not_Exist = 15;
  const _Request_Body_Wrong_Type = 16;
  const _Request_Param_Missing = 17;
  const _Request_Param_Enum_Invalid = 18;
  const _Request_Param_Wrong_Format = 19;
  const _Request_Param_Parsing_Server = 20;
}
