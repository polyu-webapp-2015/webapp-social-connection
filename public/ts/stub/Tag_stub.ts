///<reference path="DataObject.ts"/>
/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
module stub {
  export class Tag_stub extends stub.DataObject {

    /* key */
    protected static __tag_id():string {
      return "tag_id";
    }

    protected static __tag_content():string {
      return "tag_content";
    }

    /* implement DataObject */
    tableName():string {
      return "Tag";
    }
    
    uniqueKeyList():string[] {
      var list:string[] = [];
      list.push("tag_id");
      list.push("tag_content");
      return list;
    }
    
    parseObject(rawObject:any):Tag_stub {
      var instance = new Tag_stub();
      if(rawObject.hasOwnProperty('tag_id'))
        instance.tag_id = rawObject.tag_id;
      else
        throw new stub.DataObjectParseError(this);
      if(rawObject.hasOwnProperty('tag_content'))
        instance.tag_content = rawObject.tag_content;
      else
        throw new stub.DataObjectParseError(this);
      return instance;
    }
    
    toObject(instance:Tag_stub=this):any {
      var rawObject = {};
      rawObject[Tag_stub.__tag_id()] = instance.tag_id;
      rawObject[Tag_stub.__tag_content()] = instance.tag_content;
      return rawObject;
    }

    /* variable */
    private tag_id:number;
    private tag_content:string;

    /* getter and setter */
    public get_tag_id():number {
      return this.tag_id;
    }

    public set_tag_id(newValue:number) {
      if (this.isEditSupport()) {
        this.tag_id = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

    public get_tag_content():string {
      return this.tag_content;
    }

    public set_tag_content(newValue:string) {
      if (this.isEditSupport()) {
        this.tag_content = newValue;
      } else {
        throw new DataObjectEditError(this);
      }
    }

  }
  stub.add_stub_instance(new Tag_stub());
}