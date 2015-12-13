///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>
///<reference path="api.ts"/>

import Producer = lang.Producer;
import Supplier = lang.Supplier;
import Consumer = lang.Consumer;

/**
 * manage cached data object in the memory.
 * it will only delete outdated object when new version is available.
 * */
module DataObjectManager {
  import DataObject = stub.DataObject;
  type CachedObject = [number,DataObject];
  var cachedTimeInMillisecond = 1000 * 10;

  type CachedTable={[hashCode:string]:CachedObject};
  var cachedTables:{[tableName:string]:CachedTable} = {};

  function nextInvalidTime():number {
    return new Date().getTime() + cachedTimeInMillisecond;
  }

  function(){}

  /* update cached objects locally */
  function updateTable(tableName:string, newDataObjects:DataObject[]) {
    var invalidTime = nextInvalidTime();
    if (cachedTables[tableName] == null)
      cachedTables[tableName] = {};
    /* removed duplicated */
    //cachedTables[tableName] = cachedTables[tableName].filter(old=>!newDataObjects.some(newO=>newO.isSame(old[1])));
    cachedTables[tableName]=lang.Dictionary.filter(cachedTables[tableName],isDuplicated());
    /* store new objects */
    newDataObjects.forEach(e=>cachedTables[tableName].push([invalidTime, e]));
  }

  function hasOutDated(tableName:string) {
    var invalidTime = nextInvalidTime();
    if (cachedTables[tableName] == null)
      cachedTables[tableName] = [];
    cachedTables[tableName].some(e=> (e[0] <= invalidTime));
  }

  export function request<T extends stub.DataObject>(instance:T, filter:Producer<T,boolean>, consumer:Consumer<T[]>, forceUpdate:boolean = false) {
    /* try to find local */
    var tableName = instance.tableName();
    if (cachedTables[tableName] == null)
      cachedTables[tableName] = [];
    //else
    //  removeOutDatedObjects(tableName);
    var matchedList:T[] = cachedTables[tableName].map(e=><T>e[1]).filter(filter);
    if (matchedList.length > 0 && !forceUpdate) {
      /* satisfy by the local version */
      consumer(matchedList);
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

