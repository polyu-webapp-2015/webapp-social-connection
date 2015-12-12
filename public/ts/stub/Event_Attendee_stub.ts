///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Event_Attendee_stub extends stub.DataObject {

    /* key */
    protected static __event_id():string {
      return "event_id";
    }

    protected static __account_id():string {
      return "account_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Event_Attendee";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("event_id");
      list.push("account_id");
      return list;
    }
    
    parseObject(rawObject:any):Event_Attendee_stub {
      var instance = new Event_Attendee_stub();
      instance.event_id = rawObject[Event_Attendee_stub.__event_id()];
      instance.account_id = rawObject[Event_Attendee_stub.__account_id()];
      return instance;
    }
    
    toObject(instant:Event_Attendee_stub):any {
      var rawObject = {};
      rawObject[Event_Attendee_stub.__event_id()] = instant.event_id;
      rawObject[Event_Attendee_stub.__account_id()] = instant.account_id;
      return rawObject;
    }

    /* variable */
    private event_id:number;
    private account_id:number;

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

    public get_account_id():number {
      return this.account_id;
    }

    public set_account_id(newValue:number) {
      if (this.isEditSupport()) {
        this.account_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
}