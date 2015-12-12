///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Event_Organization_stub extends stub.DataObject {

    /* key */
    protected static __event_id:string = "event_id";
    protected static __organization_id:string = "organization_id";

    /* implement DataObject */
    tableName():string {
      return "Event_Organization";
    }
    
    uniqueKeyList():string[] {
      var list : string[] = [];
      list.push("event_id");
      list.push("organization_id");
      return list;
    }
    
    parseObject(rawObject:any):Event_Organization_stub {
      return null;//TODO
    }
    
    toObject(instant:Event_Organization_stub):any {
      return null;//TODO
    }

    /* variable */
    private event_id:number;
    private organization_id:number;

  }
}