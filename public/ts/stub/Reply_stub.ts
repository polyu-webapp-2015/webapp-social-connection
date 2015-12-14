///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Reply_stub extends stub.DataObject {

    /* key */
    protected static __reply_id():string {
      return "reply_id";
    }

    protected static __post_Id():string {
      return "post_Id";
    }

    protected static __message():string {
      return "message";
    }

    protected static __account_id():string {
      return "account_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Reply";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("reply_id");
      return list;
    }
    
    parseObject(rawObject:any):Reply_stub {
      var instance = new Reply_stub();
      instance.reply_id = rawObject.reply_id;
      instance.post_Id = rawObject.post_Id;
      instance.message = rawObject.message;
      instance.account_id = rawObject.account_id;
      return instance;
    }
    
    toObject(instance:Reply_stub):any {
      if (instance == null) instance = this;
      var rawObject = {};
      rawObject[Reply_stub.__reply_id()] = instance.reply_id;
      rawObject[Reply_stub.__post_Id()] = instance.post_Id;
      rawObject[Reply_stub.__message()] = instance.message;
      rawObject[Reply_stub.__account_id()] = instance.account_id;
      return rawObject;
    }

    /* variable */
    private reply_id:number;
    private post_Id:number;
    private message:string;
    private account_id:number;

    /* getter and setter */
    public get_reply_id():number {
      return this.reply_id;
    }

    public set_reply_id(newValue:number) {
      if (this.isEditSupport()) {
        this.reply_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_post_Id():number {
      return this.post_Id;
    }

    public set_post_Id(newValue:number) {
      if (this.isEditSupport()) {
        this.post_Id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_message():string {
      return this.message;
    }

    public set_message(newValue:string) {
      if (this.isEditSupport()) {
        this.message = newValue;
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