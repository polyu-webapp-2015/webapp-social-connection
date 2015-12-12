declare function get_all_row($http:any, table_name:string):any[];
declare function set_all_row($http:any, table_name:string, rows:any[]);

module stub {
  export class DataObjectError extends Error {
    public name = "DataObjectError";

    constructor(public dataObject:DataObject, public message?:string) {
      super(message);
    }
  }
  export class DataObjectEditError extends DataObjectError {
    public name = "DataObjectEditError";

    constructor(public dataObject:DataObject, public message:string = "This Object can not be edited") {
      super(dataObject, message);
    }
  }
  export class DataObjectSaveError extends DataObjectError {
    public name = "DataObjectSaveError";

    constructor(public dataObject:DataObject, public message:string = "Failed to save this object") {
      super(dataObject, message);
    }
  }
  export abstract class DataObject {
    abstract tableName():string;

    abstract uniqueKeyList():string[];

    abstract toObject(instant:DataObject):any;

    abstract parseObject(rawObject:any):DataObject ;

    public isEditSupport():boolean {
      return this.uniqueKeyList().length > 0;
    }

    public save($http:any) {
      this.save_all($http, [this]);
    }

    public save_all($http:any, dataObjects:DataObject[]) {
      if (this.isEditSupport()) {
        var rawObjects:any[] = dataObjects.map(function (dataObject:DataObject) {
          return dataObject.toObject(dataObject);
        });
        set_all_row($http, this.tableName(), rawObjects);
      } else {
        throw new DataObjectSaveError(this);
      }
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