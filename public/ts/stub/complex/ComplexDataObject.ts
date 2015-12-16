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
  import SimpleFunction = lang.SimpleFunction;

  export class ComplexDataObjectParseError extends DataObjectError {
    public name = "ComplexDataObjectParseError";

    constructor(public dataObject:ComplexDataObject, public message:string = "ComplexDataObject ("+dataObject.tableName()+") does not support parsing") {
      super(dataObject, message);
    }
  }

  export class ComplexDataObjectMissingBaseStubError extends DataObjectError {
    public name = "ComplexDataObjectParseError";

    constructor(public dataObject:ComplexDataObject,public baseDataObjectStub:DataObject, public message:string = "ComplexDataObject ("+dataObject.tableName()+") Failed to get required base stub ("+baseDataObjectStub.tableName()+")") {
      super(dataObject, message);
    }
  }
  export abstract class ComplexDataObject extends stub.DataObject {

    /**
     * @define list of base instance that hold the underlying data
     * @remark nested implement of ComplexDataObject using ComplexDataObject as base instance is not supported
     * */
    abstract baseInstances():DataObject[];

    /**
     * @define the master base instance is the 'leaf table'
     *   all other base instance are referenced by this instances' foreign key
     *
     * @return DataObject : the empty instance of dataObject
     *   that release access to logically static methods
     * */
    abstract masterStubInstance():DataObject;

    /**
     * @return DataObject : the concrete instance of dataObject that has data;
     * */
    abstract masterDataObject():DataObject;

    /**
     * @throw stub.DataObjectParseError
     * */
    //abstract parseBaseObjects(rawObjects:any[]):ComplexDataObject ;

    abstract buildFromMasterDataObject(masterDataObject:DataObject, consumer:Consumer<ComplexDataObject>);

    public isComplex():boolean {
      return true;
    }

    /**
     * @deprecated in subclass, only used in super class to compute 'isSame'
     * @return object of master instance
     * */
    toObject(instance:ComplexDataObject = this):any {
      return instance.masterDataObject().toObject();
    }

    parseObject(rawObject:any):ComplexDataObject {
      //return this.parseBaseObjects(this.baseInstances().map(baseInstance=>baseInstance.parseObject(rawObject)));
      throw new stub.ComplexDataObjectParseError(this);
    }

    uniqueKeyList():string[] {
      //return this.baseInstances()
      //  .map(baseInstance=>baseInstance.uniqueKeyList())
      //  .reduce((a, c)=>a.concat(c));
      return this.masterStubInstance().uniqueKeyList();
    }

    /**
     * parse the target base object from a list of un-ordered rawObject
     * */
    parseTargetBaseObject(rawObjects:any[], instance:DataObject) {
      var targetBaseObject = null;
      rawObjects.forEach(rawObject=> {
          try {
            targetBaseObject = instance.parseObject(rawObject);
          } catch (exception) {
          }
        }
      );
      if (targetBaseObject == null)
        throw new stub.DataObjectParseError(this);
      else
        return targetBaseObject;
    }

    /**
     * @remark security leak
     * */
    public isEditSupport():boolean {
      return this.baseInstances().some(e=>e.isEditSupport());
    }

    public isSame(another:ComplexDataObject):boolean {
      return this.masterDataObject().isSame(another.masterDataObject());
    }

    public hashCode():string {
      return this.masterDataObject().hashCode();
    }

    public use_all_instance_list(consumer:Consumer<ComplexDataObject[]>) {
      var complexInstance:ComplexDataObject = this;

      /* build all complex instance from all master instance */
      var master_dataObjects_consumer:Consumer<DataObject[]> = function (master_dataObject_array) {
        /* fork and build all complex instance */
        var complexDataObject_array:ComplexDataObject[] = [];
        /*   build pool */
        var pool:Consumer<SimpleFunction>[] = [];
        master_dataObject_array.forEach(master_dataObject=> {
          pool.push(function (reportDone) {
            /* save instance to collector (array) */
            var consumer:Consumer<ComplexDataObject> =
              (complexDataObject:ComplexDataObject)=> {
                complexDataObject_array.push(complexDataObject);
                reportDone();
              };
            complexInstance.buildFromMasterDataObject(master_dataObject, consumer);
          });
        });
        /* pass the complex instance list to consumer */
        var allDone:SimpleFunction = function () {
          consumer(complexDataObject_array);
        };
        lang.async.fork_and_join(pool, allDone);
      };

      /* get all master instance */
      complexInstance.masterStubInstance().use_all_instance_list(master_dataObjects_consumer);
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