///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>
///<reference path="api.ts"/>
var DataObjectManager;
(function (DataObjectManager) {
    function request(instance, filter, consumer) {
        var filterFunc = function (list) {
            consumer(list.filter(filter));
        };
        instance.use_all_instance_list(filterFunc);
    }
    DataObjectManager.request = request;
})(DataObjectManager || (DataObjectManager = {}));
//# sourceMappingURL=DataObjectManager.js.map