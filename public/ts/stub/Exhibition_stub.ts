///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Exhibition_stub extends stub.DataObject {

    /* key */
    protected static __event_id():string {
      return "event_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Exhibition";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("event_id");
      return list;
    }
    
    allKeyList():string[] {
      var list:string[] = [];
      list.push("event_id");
      return list;
    }
    
    parseObject(rawObject:any):Exhibition_stub {
      var instance = new Exhibition_stub();
      if(rawObject.hasOwnProperty('event_id'))
        instance.event_id = rawObject.event_id;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Exhibition_stub=this):any {
      var rawObject = {};
      rawObject[Exhibition_stub.__event_id()] = instance.event_id;
      return rawObject;
    }

    /* variable */
    private event_id:number;

    /* getter and setter */
    public get_event_id():number {
      return this.event_id * 1;
    }

    public set_event_id(newValue:number) {
      if (this.isEditSupport()) {
        this.event_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Exhibition_stub());
}