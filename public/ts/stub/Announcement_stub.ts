///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Announcement_stub extends stub.DataObject {

    /* key */
    protected static __announcement_id():string {
      return "announcement_id";
    }

    protected static __subject():string {
      return "subject";
    }

    protected static __description():string {
      return "description";
    }

    protected static __create_time():string {
      return "create_time";
    }

    protected static __creator_account_id():string {
      return "creator_account_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Announcement";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("announcement_id");
      return list;
    }
    
    parseObject(rawObject:any):Announcement_stub {
      var instance = new Announcement_stub();
      if(rawObject.hasOwnProperty('announcement_id'))
        instance.announcement_id = rawObject.announcement_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('subject'))
        instance.subject = rawObject.subject;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('description'))
        instance.description = rawObject.description;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('create_time'))
        instance.create_time = rawObject.create_time;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('creator_account_id'))
        instance.creator_account_id = rawObject.creator_account_id;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Announcement_stub=this):any {
      var rawObject = {};
      rawObject[Announcement_stub.__announcement_id()] = instance.announcement_id;
      rawObject[Announcement_stub.__subject()] = instance.subject;
      rawObject[Announcement_stub.__description()] = instance.description;
      rawObject[Announcement_stub.__create_time()] = instance.create_time;
      rawObject[Announcement_stub.__creator_account_id()] = instance.creator_account_id;
      return rawObject;
    }

    /* variable */
    private announcement_id:number;
    private subject:string;
    private description:string;
    private create_time:string;
    private creator_account_id:number;

    /* getter and setter */
    public get_announcement_id():number {
      return this.announcement_id * 1;
    }

    public set_announcement_id(newValue:number) {
      if (this.isEditSupport()) {
        this.announcement_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_subject():string {
      return this.subject ;
    }

    public set_subject(newValue:string) {
      if (this.isEditSupport()) {
        this.subject = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_description():string {
      return this.description ;
    }

    public set_description(newValue:string) {
      if (this.isEditSupport()) {
        this.description = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_create_time():string {
      return this.create_time ;
    }

    public set_create_time(newValue:string) {
      if (this.isEditSupport()) {
        this.create_time = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_creator_account_id():number {
      return this.creator_account_id * 1;
    }

    public set_creator_account_id(newValue:number) {
      if (this.isEditSupport()) {
        this.creator_account_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Announcement_stub());
}