var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var JsonArray_stub = (function (_super) {
        __extends(JsonArray_stub, _super);
        function JsonArray_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        JsonArray_stub.prototype.tableName = function () {
            return "JsonArray";
        };
        JsonArray_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("JsonArray_id");
            list.push("JsonArray_content");
            return list;
        };
        JsonArray_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        JsonArray_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        JsonArray_stub.__JsonArray_id = "JsonArray_id";
        JsonArray_stub.__JsonArray_content = "JsonArray_content";
        return JsonArray_stub;
    })(stub.DataObject);
    stub.JsonArray_stub = JsonArray_stub;
})(stub || (stub = {}));
//# sourceMappingURL=JsonArray.js.map