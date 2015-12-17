///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class City_stub extends stub.DataObject {

    /* key */
    protected static __city_id():string {
      return "city_id";
    }

    protected static __country_id():string {
      return "country_id";
    }

    protected static __city_name():string {
      return "city_name";
    }

    /* implement DataObject */
    tableName():string {
      return "City";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("city_id");
      list.push("city_name");
      return list;
    }
    
    allKeyList():string[] {
      var list:string[] = [];
      list.push("city_id");
      list.push("country_id");
      list.push("city_name");
      return list;
    }
    
    parseObject(rawObject:any):City_stub {
      var instance = new City_stub();
      if(rawObject.hasOwnProperty('city_id'))
        instance.city_id = rawObject.city_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('country_id'))
        instance.country_id = rawObject.country_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('city_name'))
        instance.city_name = rawObject.city_name;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:City_stub=this):any {
      var rawObject = {};
      rawObject[City_stub.__city_id()] = instance.city_id;
      rawObject[City_stub.__country_id()] = instance.country_id;
      rawObject[City_stub.__city_name()] = instance.city_name;
      return rawObject;
    }

    /* variable */
    private city_id:number;
    private country_id:number;
    private city_name:string;

    /* getter and setter */
    public get_city_id():number {
      return this.city_id * 1;
    }

    public set_city_id(newValue:number) {
      if (this.isEditSupport()) {
        this.city_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_country_id():number {
      return this.country_id * 1;
    }

    public set_country_id(newValue:number) {
      if (this.isEditSupport()) {
        this.country_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_city_name():string {
      return this.city_name ;
    }

    public set_city_name(newValue:string) {
      if (this.isEditSupport()) {
        this.city_name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new City_stub());
}