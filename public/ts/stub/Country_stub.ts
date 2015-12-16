///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Country_stub extends stub.DataObject {

    /* key */
    protected static __country_id():string {
      return "country_id";
    }

    protected static __country_name():string {
      return "country_name";
    }

    /* implement DataObject */
    tableName():string {
      return "Country";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("country_id");
      list.push("country_name");
      return list;
    }
    
    parseObject(rawObject:any):Country_stub {
      var instance = new Country_stub();
      if(rawObject.hasOwnProperty('country_id'))
        instance.country_id = rawObject.country_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('country_name'))
        instance.country_name = rawObject.country_name;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Country_stub=this):any {
      var rawObject = {};
      rawObject[Country_stub.__country_id()] = instance.country_id;
      rawObject[Country_stub.__country_name()] = instance.country_name;
      return rawObject;
    }

    /* variable */
    private country_id:number;
    private country_name:string;

    /* getter and setter */
    public get_country_id():number {
      return this.country_id;
    }

    public set_country_id(newValue:number) {
      if (this.isEditSupport()) {
        this.country_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_country_name():string {
      return this.country_name;
    }

    public set_country_name(newValue:string) {
      if (this.isEditSupport()) {
        this.country_name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Country_stub());
}