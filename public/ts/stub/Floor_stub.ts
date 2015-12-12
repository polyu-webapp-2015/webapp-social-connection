///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Floor_stub extends stub.DataObject {

    /* key */
    protected static __floor_id():string {
      return "floor_id";
    }

    protected static __name():string {
      return "name";
    }

    /* implement DataObject */
    tableName():string {
      return "Floor";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("floor_id");
      return list;
    }
    
    parseObject(rawObject:any):Floor_stub {
      var instance = new Floor_stub();
      instance.floor_id = rawObject[Floor_stub.__floor_id()];
      instance.name = rawObject[Floor_stub.__name()];
      return instance;
    }
    
    toObject(instant:Floor_stub):any {
      var rawObject = {};
      rawObject[Floor_stub.__floor_id()] = instant.floor_id;
      rawObject[Floor_stub.__name()] = instant.name;
      return rawObject;
    }

    /* variable */
    private floor_id:number;
    private name:string;

    /* getter and setter */
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

    public get_name():string {
      return this.name;
    }

    public set_name(newValue:string) {
      if (this.isEditSupport()) {
        this.name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
}