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

  export class DataObjectError extends TypeError {
    public name = "DataObjectError";

    constructor(public dataObject:DataObject, public message?:string) {
      super(message);
    }
  }

  export class DataObjectEditError extends DataObjectError {
    public name = "DataObjectEditError";

    constructor(public dataObject:DataObject, public message:string = "This Object (" + dataObject.tableName() + ") can not be edited") {
      super(dataObject, message);
    }
  }

  export class DataObjectSaveError extends DataObjectError {
    public name = "DataObjectSaveError";

    constructor(public dataObject:DataObject, public message:string = "Failed to save this object (" + dataObject.tableName() + ")") {
      super(dataObject, message);
    }
  }

  export class DataObjectParseError extends DataObjectError {
    public name = "DataObjectParseError";

    constructor(public dataObject:DataObject, public message:string = "Failed to parse this object (" + dataObject.tableName() + ")") {
      super(dataObject, message);
    }
  }


  export abstract class DataObject {
    abstract tableName():string;

    abstract uniqueKeyList():string[];

    abstract allKeyList():string[];

    //abstract getValueByKey(key:string):any;

    /**
     * used to sent back to server (update and create)
     *
     * also for 'AngularJS html' 'easy access'
     * */
    abstract toObject(instance?:DataObject):any;

    /**
     * @param rawObject : object from API response (return from JSON.parse)
     * @return concrete instance of DataObject
     * @throw stub.DataObjectParseError
     * */
    abstract parseObject(rawObject:any):DataObject ;

    //public isEveryMatch(patterns:KeyValue[]):boolean {
    //  return patterns.every(pair=>this.getValueByKey(pair[0]) == pair[1]);
    //}

    //public isSomeMatch(patterns:KeyValue[]|KeyValue):boolean {
    //  return patterns.some(pair=>this.getValueByKey(pair[0]) == pair[1]);
    //}

    public toObjectWithoutUniqueKeys(instance:DataObject = this):any {
      var fullObject = this.toObject(instance);
      var resultObject = {};
      var uniqueKeys = instance.uniqueKeyList();
      var targetKeys = instance.allKeyList().filter(key=>uniqueKeys.every(uniqueKey=>uniqueKey != key));
      return lang.DictionaryHelper.filter(fullObject, kv=>targetKeys.some(key=>key == kv[0]));
    }

    public isComplex():boolean {
      return false;
    }

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

    public hashCode():string {
      var keys = this.uniqueKeyList();
      var o = this.toObject(this);
      if (keys.length > 0) {
        return JSON.stringify(keys.map(key=>o[key]));
      } else {
        utils.log("Warning : this hashCode might lead to collision (" + this.tableName() + ")");
        return JSON.stringify(o);
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

    /**
     * @remark should be override by subclass (ComplexDataObject)
     * @deprecated this method does not support N-N relationship middle table (e.g. Event_Attendee)
     * */
    public create_rows_on_server<T>(dataObjects:DataObject[] = [this], consumer:Consumer<T[]>) {
      if (dataObjects.length > 0) {
        var row_array:api.Row[] = dataObjects.map(dataObject=> dataObject.toObjectWithoutUniqueKeys());
        var producer:Producer<APIResult,T[]> = function (apiResult:APIResult) {
          var resultCode:string = apiResult[0];
          var data:any = apiResult[1];
          if (resultCode == ResultCode.Success) {
            return data[APIField.id_array];
          } else {
            throw new APIParseResultError(resultCode);
          }
        };
        var handler:APIResultHandler<T[]> = [producer, consumer];
        api.create_all_row<T>(this.tableName(), row_array, handler)
      } else {
        consumer([]);
      }
    }

    public create_rows_on_server_from_raw<T>(raw_array:any[], consumer:Consumer<T[]>) {
      if (raw_array.length > 0) {
        var row_array:api.Row[] = raw_array;
        var producer:Producer<APIResult,T[]> = function (apiResult:APIResult) {
          var resultCode:string = apiResult[0];
          var data:any = apiResult[1];
          if (resultCode == ResultCode.Success) {
            return data[APIField.id_array];
          } else {
            throw new APIParseResultError(resultCode);
          }
        };
        var handler:APIResultHandler<T[]> = [producer, consumer];
        api.create_all_row<T>(this.tableName(), row_array, handler)
      } else {
        consumer([]);
      }
    }

    //TODO to implement the filter logic on server (php)
    public use_fully_matched_instance_list(queryKeyValues:KeyValue<string,any>[], consumer:Consumer<DataObject[]>) {
      throw new TypeError("Operation not support yet");
      //var applier:Consumer<DataObject[]> = function (fullList:DataObject[]) {
      //  consumer(fullList.filter(function (dataObject:DataObject) {
      //    return dataObject.isEveryMatch(queryKeyValues);
      //  }));
      //};
      //this.use_all_instance_list(applier);
    }

    //TODO to implement the filter logic on server (php)
    public use_partially_matched_instance_list(queryKeyValues:KeyValue<string,any>[], consumer:Consumer<DataObject[]>) {
      throw new TypeError("Operation not support yet");
    }
  }
  var stub_instance_list:DataObject[] = [];

  export function add_stub_instance(instance:DataObject) {
    //utils.log("adding " + instance.tableName());
    if (!stub_instance_list.some(e=>e.tableName() == instance.tableName()))
      stub_instance_list.push(instance);
  }

  export function match_by_tableName(table_name:string, prefix:string = ""):DataObject[] {
    var target = table_name.toLowerCase();
    return stub_instance_list.filter(e=>(prefix + e.tableName()).toLowerCase() == target);
  }
}