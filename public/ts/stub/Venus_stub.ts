///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Venus_stub extends stub.DataObject {

    /* key */
    protected static __venue_id():string {
      return "venue_id";
    }

    protected static __floor_id():string {
      return "floor_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Venus";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("venue_id");
      return list;
    }
    
    parseObject(rawObject:any):Venus_stub {
      var instance = new Venus_stub();
      instance.venue_id = rawObject[Venus_stub.__venue_id()];
      instance.floor_id = rawObject[Venus_stub.__floor_id()];
      return instance;
    }
    
    toObject(instant:Venus_stub):any {
      var rawObject = {};
      rawObject[Venus_stub.__venue_id()] = instant.venue_id;
      rawObject[Venus_stub.__floor_id()] = instant.floor_id;
      return rawObject;
    }

    /* variable */
    private venue_id:number;
    private floor_id:number;

    /* getter and setter */
    public get_venue_id():number {
      return this.venue_id;
    }

    public set_venue_id(newValue:number) {
      if (this.isEditSupport()) {
        this.venue_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_floor_id():number {
      return this.floor_id;
    }

    public set_floor_id(newValue:number) {
      if (this.isEditSupport()) {
        this.floor_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
}