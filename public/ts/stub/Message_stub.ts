///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Message_stub extends stub.DataObject {

    /* key */
    protected static __msg_id():string {
      return "msg_id";
    }

    protected static __from_account_id():string {
      return "from_account_id";
    }

    protected static __to_account_id():string {
      return "to_account_id";
    }

    protected static __create_time():string {
      return "create_time";
    }

    protected static __read_time():string {
      return "read_time";
    }

    /* implement DataObject */
    tableName():string {
      return "Message";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("msg_id");
      return list;
    }
    
    parseObject(rawObject:any):Message_stub {
      var instance = new Message_stub();
      if(rawObject.hasOwnProperty('msg_id'))
        instance.msg_id = rawObject.msg_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('from_account_id'))
        instance.from_account_id = rawObject.from_account_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('to_account_id'))
        instance.to_account_id = rawObject.to_account_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('create_time'))
        instance.create_time = rawObject.create_time;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('read_time'))
        instance.read_time = rawObject.read_time;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Message_stub=this):any {
      var rawObject = {};
      rawObject[Message_stub.__msg_id()] = instance.msg_id;
      rawObject[Message_stub.__from_account_id()] = instance.from_account_id;
      rawObject[Message_stub.__to_account_id()] = instance.to_account_id;
      rawObject[Message_stub.__create_time()] = instance.create_time;
      rawObject[Message_stub.__read_time()] = instance.read_time;
      return rawObject;
    }

    /* variable */
    private msg_id:number;
    private from_account_id:number;
    private to_account_id:number;
    private create_time:string;
    private read_time:string;

    /* getter and setter */
    public get_msg_id():number {
      return this.msg_id;
    }

    public set_msg_id(newValue:number) {
      if (this.isEditSupport()) {
        this.msg_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_from_account_id():number {
      return this.from_account_id;
    }

    public set_from_account_id(newValue:number) {
      if (this.isEditSupport()) {
        this.from_account_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_to_account_id():number {
      return this.to_account_id;
    }

    public set_to_account_id(newValue:number) {
      if (this.isEditSupport()) {
        this.to_account_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_create_time():string {
      return this.create_time;
    }

    public set_create_time(newValue:string) {
      if (this.isEditSupport()) {
        this.create_time = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_read_time():string {
      return this.read_time;
    }

    public set_read_time(newValue:string) {
      if (this.isEditSupport()) {
        this.read_time = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Message_stub());
}