///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Account_stub extends stub.DataObject {

    /* key */
    protected static __account_id():string {
      return "account_id";
    }

    protected static __password():string {
      return "password";
    }

    protected static __account_type():string {
      return "account_type";
    }

    protected static __email():string {
      return "email";
    }

    protected static __phone_num():string {
      return "phone_num";
    }

    /* implement DataObject */
    tableName():string {
      return "Account";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("account_id");
      list.push("email");
      list.push("phone_num");
      return list;
    }
    
    parseObject(rawObject:any):Account_stub {
      var instance = new Account_stub();
      instance.account_id = rawObject.account_id;
      instance.password = rawObject.password;
      instance.account_type = rawObject.account_type;
      instance.email = rawObject.email;
      instance.phone_num = rawObject.phone_num;
      return instance;
    }
    
    toObject(instance:Account_stub):any {
      if (instance == null) instance = this;
      var rawObject = {};
      rawObject[Account_stub.__account_id()] = instance.account_id;
      rawObject[Account_stub.__password()] = instance.password;
      rawObject[Account_stub.__account_type()] = instance.account_type;
      rawObject[Account_stub.__email()] = instance.email;
      rawObject[Account_stub.__phone_num()] = instance.phone_num;
      return rawObject;
    }

    /* variable */
    private account_id:number;
    private password:string;
    private account_type:string;
    private email:string;
    private phone_num:string;

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

    public get_password():string {
      return this.password;
    }

    public set_password(newValue:string) {
      if (this.isEditSupport()) {
        this.password = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_account_type():string {
      return this.account_type;
    }

    public set_account_type(newValue:string) {
      if (this.isEditSupport()) {
        this.account_type = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_email():string {
      return this.email;
    }

    public set_email(newValue:string) {
      if (this.isEditSupport()) {
        this.email = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_phone_num():string {
      return this.phone_num;
    }

    public set_phone_num(newValue:string) {
      if (this.isEditSupport()) {
        this.phone_num = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
}