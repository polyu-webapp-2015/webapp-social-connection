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
        JsonArray_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("JsonArray_id");
            list.push("JsonArray_content");
            return list;
        };
        JsonArray_stub.prototype.parseObject = function (rawObject) {
            var instance = new JsonArray_stub();
            if (rawObject.hasOwnProperty('JsonArray_id'))
                instance.JsonArray_id = rawObject.JsonArray_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('JsonArray_content'))
                instance.JsonArray_content = rawObject.JsonArray_content;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        JsonArray_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[JsonArray_stub.__JsonArray_id()] = instance.JsonArray_id;
            rawObject[JsonArray_stub.__JsonArray_content()] = instance.JsonArray_content;
            return rawObject;
        };
        /* getter and setter */
        JsonArray_stub.prototype.get_JsonArray_id = function () {
            return this.JsonArray_id * 1;
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
    stub.add_stub_instance(new JsonArray_stub());
})(stub || (stub = {}));
//# sourceMappingURL=JsonArray_stub.js.map