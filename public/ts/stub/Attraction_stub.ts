///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Attraction_stub extends stub.DataObject {

    /* key */
    protected static __event_id():string {
      return "event_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Attraction";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("event_id");
      return list;
    }
    
    parseObject(rawObject:any):Attraction_stub {
      var instance = new Attraction_stub();
      if(rawObject.hasOwnProperty('event_id'))
        instance.event_id = rawObject.event_id;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Attraction_stub=this):any {
      var rawObject = {};
      rawObject[Attraction_stub.__event_id()] = instance.event_id;
      return rawObject;
    }

    /* variable */
    private event_id:number;

    /* getter and setter */
    public get_event_id():number {
      return this.event_id;
    }

    public set_event_id(newValue:number) {
      if (this.isEditSupport()) {
        this.event_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Attraction_stub());
}