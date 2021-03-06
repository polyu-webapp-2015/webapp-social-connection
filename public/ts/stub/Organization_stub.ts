///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Organization_stub extends stub.DataObject {

    /* key */
    protected static __organization_id():string {
      return "organization_id";
    }

    protected static __organization_type():string {
      return "organization_type";
    }

    protected static __name():string {
      return "name";
    }

    protected static __main_country():string {
      return "main_country";
    }

    /* implement DataObject */
    tableName():string {
      return "Organization";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("organization_id");
      return list;
    }
    
    allKeyList():string[] {
      var list:string[] = [];
      list.push("organization_id");
      list.push("organization_type");
      list.push("name");
      list.push("main_country");
      return list;
    }
    
    parseObject(rawObject:any):Organization_stub {
      var instance = new Organization_stub();
      if(rawObject.hasOwnProperty('organization_id'))
        instance.organization_id = rawObject.organization_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('organization_type'))
        instance.organization_type = rawObject.organization_type;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('name'))
        instance.name = rawObject.name;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('main_country'))
        instance.main_country = rawObject.main_country;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Organization_stub=this):any {
      var rawObject = {};
      rawObject[Organization_stub.__organization_id()] = instance.organization_id;
      rawObject[Organization_stub.__organization_type()] = instance.organization_type;
      rawObject[Organization_stub.__name()] = instance.name;
      rawObject[Organization_stub.__main_country()] = instance.main_country;
      return rawObject;
    }

    /* variable */
    private organization_id:number;
    private organization_type:string;
    private name:string;
    private main_country:number;

    /* getter and setter */
    public get_organization_id():number {
      return this.organization_id * 1;
    }

    public set_organization_id(newValue:number) {
      if (this.isEditSupport()) {
        this.organization_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_organization_type():string {
      return this.organization_type ;
    }

    public set_organization_type(newValue:string) {
      if (this.isEditSupport()) {
        this.organization_type = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_name():string {
      return this.name ;
    }

    public set_name(newValue:string) {
      if (this.isEditSupport()) {
        this.name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_main_country():number {
      return this.main_country * 1;
    }

    public set_main_country(newValue:number) {
      if (this.isEditSupport()) {
        this.main_country = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Organization_stub());
}