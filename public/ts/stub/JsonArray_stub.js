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
        /* key */
        JsonArray_stub.__JsonArray_id = function () {
            return "JsonArray_id";
        };
        JsonArray_stub.__JsonArray_content = function () {
            return "JsonArray_content";
        };
        /* implement DataObject */
        JsonArray_stub.prototype.tableName = function () {
            return "JsonArray";
        };
        JsonArray_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("JsonArray_id");
            return list;
        };
        JsonArray_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        JsonArray_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* getter and setter */
        JsonArray_stub.prototype.get_JsonArray_id = function () {
            return this.JsonArray_id;
        };
        JsonArray_stub.prototype.set_JsonArray_id = function (newValue) {
            if (this.isEditSupport()) {
                this.JsonArray_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        JsonArray_stub.prototype.get_JsonArray_content = function () {
            return this.JsonArray_content;
        };
        JsonArray_stub.prototype.set_JsonArray_content = function (newValue) {
            if (this.isEditSupport()) {
                this.JsonArray_content = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return JsonArray_stub;
    })(stub.DataObject);
    stub.JsonArray_stub = JsonArray_stub;
})(stub || (stub = {}));
//# sourceMappingURL=JsonArray_stub.js.map