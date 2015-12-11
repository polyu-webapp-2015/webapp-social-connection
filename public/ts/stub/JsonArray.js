var JsonArray_stub = (function () {
    function JsonArray_stub() {
    }
    JsonArray_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    JsonArray_stub.parseObject = function (rawObject) {
        //TODO
        var myJsonArray = new JsonArray();
        myJsonArray.JsonArray_id = rawObject.JsonArray_id;
        myJsonArray.JsonArray_content = rawObject.JsonArray_content;
        return myJsonArray;
    };
    JsonArray_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    JsonArray_stub.table_name = "JsonArray";
    JsonArray_stub.__JsonArray_id = "JsonArray_id";
    JsonArray_stub.__JsonArray_content = "JsonArray_content";
    return JsonArray_stub;
})();
var JsonArray = (function () {
    function JsonArray() {
    }
    JsonArray.table_name = "JsonArray";
    return JsonArray;
})();
//# sourceMappingURL=JsonArray.js.map