///<reference path="../../api.ts"/>
///<reference path="../../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../../debug.ts"/>
///<reference path="../DataObject.ts"/>


module stub {
  import Consumer = lang.Consumer;
  import Producer = lang.Producer;
  import APIResultHandler = api.APIResultHandler;
  import APIResult = api.APIResult;
  import APIParseResultError = debug.APIParseResultError;
  import KeyValue = lang.KeyValue;
  import use_all_row = api.use_all_row;
  export abstract class ComplexDataObject extends stub.DataObject {

    abstract baseInstances():DataObject[];

    abstract parseBaseObjects(rawObjects:any[]):ComplexDataObject ;

    abstract toBaseObjects():any[];

    toObject(instance:ComplexDataObject):any {
      if (instance == null)
        instance = this;
      var rawObjects:any[] = this.toBaseObjects();
      var complexObject = {};
      type objectKeyValue=[string,any];
      var consumer:Consumer<objectKeyValue> = function (keyValue:objectKeyValue) {
        complexObject[keyValue[0]] = keyValue[1];
      };
      rawObjects.forEach(rawObject=>lang.DictionaryHelper.forEach<string,any>(rawObject, consumer));
      return complexObject;
    }

    parseObject(rawObject:any):ComplexDataObject {
      return this.parseBaseObjects(this.baseInstances().map(baseInstance=>baseInstance.parseObject(rawObject)));
    }

    uniqueKeyList():string[] {
      return this.baseInstances()
        .map(baseInstance=>baseInstance.uniqueKeyList())
        .reduce((a, c)=>a.concat(c));
    }


    public isEditSupport():boolean {
      return this.uniqueKeyList().length > 0;
    }

    public isSame(another:ComplexDataObject):boolean {
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
        console.log("Warning : this hashCode might lead to collision");
        return JSON.stringify(o);
      }
    }

    public use_all_instance_list(consumer:Consumer<ComplexDataObject[]>) {
      var instance = this;
      var producer:Producer<APIResult,ComplexDataObject[]> = function (apiResult:APIResult) {
        var resultCode:string = apiResult[0];
        var data:any = apiResult[1];
        if (resultCode == ResultCode.Success) {
          var all_row = data[APIField.element_array];
          return all_row.map(instance.parseObject);
        } else {
          throw new APIParseResultError(resultCode);
        }
      };
      var handler:APIResultHandler<ComplexDataObject[]> = [producer, consumer];
      api.use_all_row<ComplexDataObject[]>(this.tableName(), handler);
    }

    //TODO to implement the filter logic on server (php)
    public use_fully_matched_instance_list(queryKeyValues:KeyValue<string,any>[], consumer:Consumer<ComplexDataObject[]>) {
      throw new TypeError("Operation not support yet");
    }

    //TODO to implement the filter logic on server (php)
    public use_partially_matched_instance_list(queryKeyValues:KeyValue<string,any>[], consumer:Consumer<ComplexDataObject[]>) {
      throw new TypeError("Operation not support yet");
    }

  }
}