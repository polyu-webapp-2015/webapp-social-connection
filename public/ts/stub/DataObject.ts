///<reference path="../main.ts"/>


module stub {
  import APICallback = api.APICallback;
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
        api.set_all_row(this.tableName(), rawObjects);
      } else {
        throw new DataObjectSaveError(this);
      }
    }

    public use_all_instance_list(consumer:comm.Consumer<DataObject[]>) {
      var instance = this;
      var success:api.APICallback<DataObject[]> = function (resultCode:string, data:any) {
        if (resultCode == ResultCode.Success) {
          var all_row = data[APIField.element_array];
          var dataObjects:DataObject[] = all_row.map(instance.parseObject);
          consumer(dataObjects);
        } else {
          comm.log("failed to get all instance of " + instance.tableName())
        }
      };
      api.get_all_row(this.tableName(), success);
    }

    public use_matched_instance_list(query_key_value_array, consumer:comm.Consumer<DataObject[]>) {
      throw new TypeError("Operation not support yet");
    }
  }
}