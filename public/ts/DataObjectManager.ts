///<reference path="lang.ts"/>
///<reference path="stub/DataObject.ts"/>

import Producer = lang.Producer;
import Supplier = lang.Supplier;
import Consumer = lang.Consumer;

/**
 * manage cached data object in the memory.
 * it will only delete outdated object when new version is available.
 * */
module DataObjectManager {
  import DataObject = stub.DataObject;
  import KeyValue = lang.KeyValue;
  type CachedObject = [number,DataObject];
  var cachedTimeInMillisecond = 1000 * 10;

  /**
   * key : string (hashCode)
   * value : CachedObject
   * */
  type CachedTable={};
  /**
   * key : string (tableName)
   * value : CachedTable
   * */
  var cachedTables:{} = {};

  function nextInvalidTime():number {
    return new Date().getTime() + cachedTimeInMillisecond;
  }


  /* update cached objects locally */
  function updateTable(tableName:string, newDataObjects:DataObject[]) {
    var invalidTime = nextInvalidTime();
    if (cachedTables[tableName] == null)
      cachedTables[tableName] = {};
    newDataObjects.forEach(e=>cachedTables[tableName][e.hashCode()] = ([invalidTime, e]));
  }

  function hasOutDated(tableName:string) {
    var invalidTime = nextInvalidTime();
    if (cachedTables[tableName] == null)
      cachedTables[tableName] = {};
    cachedTables[tableName].some(e=> (e[0] <= invalidTime));
  }

  export function add<T extends stub.DataObject>(instance:T) {
    updateTable(instance.tableName(), [instance]);
  }

  export function request<T extends stub.DataObject>(instance:T, filter:Producer<T,boolean>, consumer:Consumer<T[]>, forceUpdate:boolean = false) {
    /* try to find local */
    var tableName = instance.tableName();
    if (cachedTables[tableName] == null)
      cachedTables[tableName] = {};
    //else
    // removeOutDatedObjects(tableName);
    //var matchedList:T[] = cachedTables[tableName].map(e=><T>e[1]).filter(filter);
    var matchedList:T[] = lang.DictionaryHelper.map(cachedTables[tableName], (cachedObjectItem=> {
      var cachedObject = cachedObjectItem[1];
      var dataObject = cachedObject[1];
      return <T> dataObject;
    })) .filter(filter);
    if (matchedList.length > 0 && !forceUpdate) {
      /* satisfy by the local version */
      consumer(matchedList);
      /* update in background */
      var filterFunc:Consumer<T[]> = function (list:T[]) {
        updateTable(tableName, list);
      };
      instance.use_all_instance_list(filterFunc);
    } else {
      /* get from server */
      var filterFunc:Consumer<T[]> = function (list:T[]) {
        updateTable(tableName, list);
        consumer(list.filter(filter));
      };
      instance.use_all_instance_list(filterFunc)
    }
  }
}

