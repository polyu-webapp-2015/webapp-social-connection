///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class DiscussBoard_stub extends stub.DataObject {

    /* key */
    protected static __discussboard_id():string {
      return "discussboard_id";
    }

    protected static __subject():string {
      return "subject";
    }

    protected static __description():string {
      return "description";
    }

    /* implement DataObject */
    tableName():string {
      return "DiscussBoard";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("discussboard_id");
      return list;
    }
    
    parseObject(rawObject:any):DiscussBoard_stub {
      var instance = new DiscussBoard_stub();
      instance.discussboard_id = rawObject.discussboard_id;
      instance.subject = rawObject.subject;
      instance.description = rawObject.description;
      return instance;
    }
    
    toObject(instance:DiscussBoard_stub):any {
      if (instance == null) instance = this;
      var rawObject = {};
      rawObject[DiscussBoard_stub.__discussboard_id()] = instance.discussboard_id;
      rawObject[DiscussBoard_stub.__subject()] = instance.subject;
      rawObject[DiscussBoard_stub.__description()] = instance.description;
      return rawObject;
    }

    /* variable */
    private discussboard_id:number;
    private subject:string;
    private description:string;

    /* getter and setter */
    public get_discussboard_id():number {
      return this.discussboard_id;
    }

    public set_discussboard_id(newValue:number) {
      if (this.isEditSupport()) {
        this.discussboard_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_subject():string {
      return this.subject;
    }

    public set_subject(newValue:string) {
      if (this.isEditSupport()) {
        this.subject = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_description():string {
      return this.description;
    }

    public set_description(newValue:string) {
      if (this.isEditSupport()) {
        this.description = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
}