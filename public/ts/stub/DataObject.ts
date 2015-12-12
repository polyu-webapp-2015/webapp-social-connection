declare function get_all_row($http:any, table_name:string):any[];
module stub {
  export abstract class DataObject {
    abstract tableName():string;

    abstract uniqueKeyList():string[];

    abstract toObject(instant:DataObject):any;

    abstract parseObject(rawObject:any):DataObject ;

    public isEditSupport():boolean {
      return this.uniqueKeyList().length > 0;
    }

    public get_all_instance_list($http):DataObject[] {
      var all_row = get_all_row($http, this.tableName());
      return all_row.map(row => this.parseObject(row));
    }

    public get_matched_instance_list($http, query_key_value_array):DataObject[] {
      throw new TypeError("Operation not support yet");
    }
  }
}