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

  var cachedMap:{[tableName:string]:CachedObject[]} = {};

  function nextInvalidTime():number {
    return new Date().getTime() + cachedTimeInMillisecond;
  }

  /* update cached objects locally */
  function updateTable(table_name:string, newDataObjects:DataObject[]) {
    var invalidTime = nextInvalidTime();
    if (cachedMap[table_name] == null)
      cachedMap[table_name] = [];
    /* removed duplicated */
    cachedMap[table_name] = cachedMap[table_name].filter(old=>!newDataObjects.some(newO=>newO.isSame(old[1])));
    /* store new objects */
    newDataObjects.forEach(e=>cachedMap[table_name].push([invalidTime, e]));
  }

  function hasOutDated(tableName:string) {
    var invalidTime = nextInvalidTime();
    if (cachedMap[tableName] == null)
      cachedMap[tableName] = [];
    cachedMap[tableName].some(e=> (e[0] <= invalidTime));
  }

  export function request<T extends stub.DataObject>(instance:T, filter:Producer<T,boolean>, consumer:Consumer<T[]>, forceUpdate:boolean = false) {
    /* try to find local */
    var tableName = instance.tableName();
    if (cachedMap[tableName] == null)
      cachedMap[tableName] = [];
    //else
    //  removeOutDatedObjects(tableName);
    var matchedList:T[] = cachedMap[tableName].map(e=><T>e[1]).filter(filter);
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

