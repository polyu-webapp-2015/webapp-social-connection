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

    protected static __floor_name():string {
      return "floor_name";
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
      if(rawObject.hasOwnProperty('floor_id'))
        instance.floor_id = rawObject.floor_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('floor_name'))
        instance.floor_name = rawObject.floor_name;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Floor_stub=this):any {
      var rawObject = {};
      rawObject[Floor_stub.__floor_id()] = instance.floor_id;
      rawObject[Floor_stub.__floor_name()] = instance.floor_name;
      return rawObject;
    }

    /* variable */
    private floor_id:number;
    private floor_name:string;

    /* getter and setter */
    public get_floor_id():number {
      return this.floor_id * 1;
    }

    public set_floor_id(newValue:number) {
      if (this.isEditSupport()) {
        this.floor_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_floor_name():string {
      return this.floor_name ;
    }

    public set_floor_name(newValue:string) {
      if (this.isEditSupport()) {
        this.floor_name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Floor_stub());
}