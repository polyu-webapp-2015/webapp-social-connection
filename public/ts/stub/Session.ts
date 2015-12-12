///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Session_stub extends stub.DataObject {

    /* key */
    protected static __event_id:string = "event_id";
    protected static __quota:string = "quota";

    /* implement DataObject */
    tableName():string {
      return "Session";
    }
    
    uniqueKeyList():string[] {
      var list : string[] = [];
      list.push("event_id");
      list.push("quota");
      return list;
    }
    
    parseObject(rawObject:any):Session_stub {
      return null;//TODO
    }
    
    toObject(instant:Session_stub):any {
      return null;//TODO
    }

    /* variable */
    private event_id:number;
    private quota:number;

  }
}