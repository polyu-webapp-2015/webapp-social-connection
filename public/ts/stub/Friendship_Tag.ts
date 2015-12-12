///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Friendship_Tag_stub extends stub.DataObject {

    /* key */
    protected static __friendship_id:string = "friendship_id";
    protected static __tag_id:string = "tag_id";

    /* implement DataObject */
    tableName():string {
      return "Friendship_Tag";
    }
    
    uniqueKeyList():string[] {
      var list : string[] = [];
      list.push("friendship_id");
      list.push("tag_id");
      return list;
    }
    
    parseObject(rawObject:any):Friendship_Tag_stub {
      return null;//TODO
    }
    
    toObject(instant:Friendship_Tag_stub):any {
      return null;//TODO
    }

    /* variable */
    private friendship_id:number;
    private tag_id:number;

  }
}