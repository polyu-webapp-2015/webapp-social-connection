///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Post_stub extends stub.DataObject {

    /* key */
    protected static __post_Id():string {
      return "post_Id";
    }

    protected static __subject():string {
      return "subject";
    }

    protected static __description():string {
      return "description";
    }

    protected static __discussboard_id():string {
      return "discussboard_id";
    }

    /* implement DataObject */
    tableName():string {
      return "Post";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("post_Id");
      return list;
    }
    
    parseObject(rawObject:any):Post_stub {
      var instance = new Post_stub();
      instance.post_Id = rawObject[Post_stub.__post_Id()];
      instance.subject = rawObject[Post_stub.__subject()];
      instance.description = rawObject[Post_stub.__description()];
      instance.discussboard_id = rawObject[Post_stub.__discussboard_id()];
      return instance;
    }
    
    toObject(instant:Post_stub):any {
      var rawObject = {};
      rawObject[Post_stub.__post_Id()] = instant.post_Id;
      rawObject[Post_stub.__subject()] = instant.subject;
      rawObject[Post_stub.__description()] = instant.description;
      rawObject[Post_stub.__discussboard_id()] = instant.discussboard_id;
      return rawObject;
    }

    /* variable */
    private post_Id:number;
    private subject:string;
    private description:string;
    private discussboard_id:number;

    /* getter and setter */
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

  }
}