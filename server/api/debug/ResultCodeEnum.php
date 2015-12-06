<?php
class ResultCodeEnum
{
  const _ = "resultCode";
  const _Success = 0;
  const _Server_Config_Error = 1;
  const _Unknown_API = 2;
  const _Failed_To_Connect_To_Database = 3;
  const _Failed_To_Query_On_Database = 4;
  const _Failed_To_Insert_On_Database = 5;
  const _Database_Corrupt = 6;
  const _Network_Not_Stable = 7;
  const _Duplicated = 8;
  const _User_Not_Exist = 9;
  const _Password_Wrong = 10;
  const _No_Permission = 11;
  const _Group_Not_Exist = 12;
  const _Request_Body_Wrong_Type = 13;
  const _Request_Param_Missing = 14;
  const _Request_Param_Enum_Invalid = 15;
  const _Request_Param_Wrong_Format = 16;
  const _Request_Param_Parsing_Server = 17;
}
