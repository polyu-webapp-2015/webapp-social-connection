///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>
///<reference path="api.ts"/>
/**
 * manage cached data object in the memory.
 * it will only delete outdated object when new version is available.
 * */
var DataObjectManager;
(function (DataObjectManager) {
    var cachedTimeInMillisecond = 1000 * 10;
    var cachedMap = {};
    function nextInvalidTime() {
        return new Date().getTime() + cachedTimeInMillisecond;
    }
    /* update cached objects locally */
    function updateTable(table_name, newDataObjects) {
        var invalidTime = nextInvalidTime();
        if (cachedMap[table_name] == null)
            cachedMap[table_name] = [];
        /* removed duplicated */
        cachedMap[table_name] = cachedMap[table_name].filter(function (old) { return !newDataObjects.some(function (newO) { return newO.isSame(old[1]); }); });
        /* store new objects */
        newDataObjects.forEach(function (e) { return cachedMap[table_name].push([invalidTime, e]); });
    }
    function hasOutDated(tableName) {
        var invalidTime = nextInvalidTime();
        if (cachedMap[tableName] == null)
            cachedMap[tableName] = [];
        cachedMap[tableName].some(function (e) { return (e[0] <= invalidTime); });
    }
    function request(instance, filter, consumer, forceUpdate) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        /* try to find local */
        var tableName = instance.tableName();
        if (cachedMap[tableName] == null)
            cachedMap[tableName] = [];
        //else
        //  removeOutDatedObjects(tableName);
        var matchedList = cachedMap[tableName].map(function (e) { return e[1]; }).filter(filter);
        if (matchedList.length > 0 && !forceUpdate) {
            /* satisfy by the local version */
            consumer(matchedList);
        }
        else {
            /* get from server */
            var filterFunc = function (list) {
                updateTable(tableName, list);
                consumer(list.filter(filter));
            };
            instance.use_all_instance_list(filterFunc);
        }
    }
    DataObjectManager.request = request;
})(DataObjectManager || (DataObjectManager = {}));
//# sourceMappingURL=DataObjectManager.js.map