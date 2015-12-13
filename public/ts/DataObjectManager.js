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
    var cachedTables = {};
    function nextInvalidTime() {
        return new Date().getTime() + cachedTimeInMillisecond;
    }
    function () { }
    /* update cached objects locally */
    function updateTable(tableName, newDataObjects) {
        var invalidTime = nextInvalidTime();
        if (cachedTables[tableName] == null)
            cachedTables[tableName] = {};
        /* removed duplicated */
        //cachedTables[tableName] = cachedTables[tableName].filter(old=>!newDataObjects.some(newO=>newO.isSame(old[1])));
        cachedTables[tableName] = lang.Dictionary.filter(cachedTables[tableName], isDuplicated());
        /* store new objects */
        newDataObjects.forEach(function (e) { return cachedTables[tableName].push([invalidTime, e]); });
    }
    function hasOutDated(tableName) {
        var invalidTime = nextInvalidTime();
        if (cachedTables[tableName] == null)
            cachedTables[tableName] = [];
        cachedTables[tableName].some(function (e) { return (e[0] <= invalidTime); });
    }
    function request(instance, filter, consumer, forceUpdate) {
        if (forceUpdate === void 0) { forceUpdate = false; }
        /* try to find local */
        var tableName = instance.tableName();
        if (cachedTables[tableName] == null)
            cachedTables[tableName] = [];
        //else
        //  removeOutDatedObjects(tableName);
        var matchedList = cachedTables[tableName].map(function (e) { return e[1]; }).filter(filter);
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