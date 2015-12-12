///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class User_stub extends stub.DataObject {

    /* key */
    protected static __account_id():string {
      return "account_id";
    }

    protected static __sex():string {
      return "sex";
    }

    protected static __first_name():string {
      return "first_name";
    }

    protected static __last_name():string {
      return "last_name";
    }

    protected static __organization_id():string {
      return "organization_id";
    }

    protected static __title_id():string {
      return "title_id";
    }

    protected static __city_id():string {
      return "city_id";
    }

    protected static __last_announcement_datetime():string {
      return "last_announcement_datetime";
    }

    /* implement DataObject */
    tableName():string {
      return "User";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("account_id");
      return list;
    }
    
    parseObject(rawObject:any):User_stub {
      var instance = new User_stub();
      instance.account_id = rawObject[User_stub.__account_id()];
      instance.sex = rawObject[User_stub.__sex()];
      instance.first_name = rawObject[User_stub.__first_name()];
      instance.last_name = rawObject[User_stub.__last_name()];
      instance.organization_id = rawObject[User_stub.__organization_id()];
      instance.title_id = rawObject[User_stub.__title_id()];
      instance.city_id = rawObject[User_stub.__city_id()];
      instance.last_announcement_datetime = rawObject[User_stub.__last_announcement_datetime()];
      return instance;
    }
    
    toObject(instant:User_stub):any {
      var rawObject = {};
      rawObject[User_stub.__account_id()] = instant.account_id;
      rawObject[User_stub.__sex()] = instant.sex;
      rawObject[User_stub.__first_name()] = instant.first_name;
      rawObject[User_stub.__last_name()] = instant.last_name;
      rawObject[User_stub.__organization_id()] = instant.organization_id;
      rawObject[User_stub.__title_id()] = instant.title_id;
      rawObject[User_stub.__city_id()] = instant.city_id;
      rawObject[User_stub.__last_announcement_datetime()] = instant.last_announcement_datetime;
      return rawObject;
    }

    /* variable */
    private account_id:number;
    private sex:string;
    private first_name:string;
    private last_name:string;
    private organization_id:number;
    private title_id:number;
    private city_id:number;
    private last_announcement_datetime:string;

    /* getter and setter */
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

    public get_sex():string {
      return this.sex;
    }

    public set_sex(newValue:string) {
      if (this.isEditSupport()) {
        this.sex = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_first_name():string {
      return this.first_name;
    }

    public set_first_name(newValue:string) {
      if (this.isEditSupport()) {
        this.first_name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_last_name():string {
      return this.last_name;
    }

    public set_last_name(newValue:string) {
      if (this.isEditSupport()) {
        this.last_name = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_organization_id():number {
      return this.organization_id;
    }

    public set_organization_id(newValue:number) {
      if (this.isEditSupport()) {
        this.organization_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_title_id():number {
      return this.title_id;
    }

    public set_title_id(newValue:number) {
      if (this.isEditSupport()) {
        this.title_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_city_id():number {
      return this.city_id;
    }

    public set_city_id(newValue:number) {
      if (this.isEditSupport()) {
        this.city_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_last_announcement_datetime():string {
      return this.last_announcement_datetime;
    }

    public set_last_announcement_datetime(newValue:string) {
      if (this.isEditSupport()) {
        this.last_announcement_datetime = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
}