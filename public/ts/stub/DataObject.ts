///<reference path="../api.ts"/>
///<reference path="../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../debug.ts"/>


module stub {
  import Consumer = lang.Consumer;
  import Producer = lang.Producer;
  import APIResultHandler = api.APIResultHandler;
  import APIResult = api.APIResult;
  import APIParseResultError = debug.APIParseResultError;
  import KeyValue = lang.KeyValue;
  import use_all_row = api.use_all_row;
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

    //abstract fullKeyList():string[];

    //abstract getValueByKey(key:string):any;

    abstract toObject(instant:DataObject):any;

    abstract parseObject(rawObject:any):DataObject ;

    //public isEveryMatch(patterns:KeyValue[]):boolean {
    //  return patterns.every(pair=>this.getValueByKey(pair[0]) == pair[1]);
    //}

    //public isSomeMatch(patterns:KeyValue[]|KeyValue):boolean {
    //  return patterns.some(pair=>this.getValueByKey(pair[0]) == pair[1]);
    //}

    public isEditSupport():boolean {
      return this.uniqueKeyList().length > 0;
    }

    //TODO implement faster method (direct compare in subclass)
    public isSame(another:DataObject):boolean {
      var keys = this.uniqueKeyList();
      if (keys.length <= 0)
        return false;
      else {
        var thisO = this.toObject(this);
        var anotherO = another.toObject(another);
        return keys.every(key=>thisO[key] == anotherO[key]);
      }
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

    public use_all_instance_list(consumer:Consumer<DataObject[]>) {
      var instance = this;
      var producer:Producer<APIResult,DataObject[]> = function (apiResult:APIResult) {
        var resultCode:string = apiResult[0];
        var data:any = apiResult[1];
        if (resultCode == ResultCode.Success) {
          var all_row = data[APIField.element_array];
          return all_row.map(instance.parseObject);
        } else {
          throw new APIParseResultError(resultCode);
        }
      };
      var handler:APIResultHandler<DataObject[]> = [producer, consumer];
      api.use_all_row<DataObject[]>(this.tableName(), handler);
    }

    //TODO to implment the filter logic on server (php)
    public use_fully_matched_instance_list(queryKeyValues:KeyValue[], consumer:Consumer<DataObject[]>) {
      throw new TypeError("Operation not support yet");
      //var applier:Consumer<DataObject[]> = function (fullList:DataObject[]) {
      //  consumer(fullList.filter(function (dataObject:DataObject) {
      //    return dataObject.isEveryMatch(queryKeyValues);
      //  }));
      //};
      //this.use_all_instance_list(applier);
    }

    //TODO to implement the filter logic on server (php)
    public use_partially_matched_instance_list(queryKeyValues:KeyValue[], consumer:Consumer<DataObject[]>) {
      throw new TypeError("Operation not support yet");
    }

  }
}