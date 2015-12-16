///<reference path="../../api.ts"/>
///<reference path="../../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../../debug.ts"/>
///<reference path="../DataObject.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stub;
(function (stub) {
    var APIParseResultError = debug.APIParseResultError;
    var ComplexDataObject = (function (_super) {
        __extends(ComplexDataObject, _super);
        function ComplexDataObject() {
            _super.apply(this, arguments);
        }
        ComplexDataObject.prototype.toObject = function (instance) {
            if (instance == null)
                instance = this;
            var rawObjects = this.toBaseObjects();
            var complexObject = {};
            var consumer = function (keyValue) {
                complexObject[keyValue[0]] = keyValue[1];
            };
            rawObjects.forEach(function (rawObject) { return lang.DictionaryHelper.forEach(rawObject, consumer); });
            return complexObject;
        };
        ComplexDataObject.prototype.parseObject = function (rawObject) {
            return this.parseBaseObjects(this.baseInstances().map(function (baseInstance) { return baseInstance.parseObject(rawObject); }));
        };
        ComplexDataObject.prototype.uniqueKeyList = function () {
            return this.baseInstances()
                .map(function (baseInstance) { return baseInstance.uniqueKeyList(); })
                .reduce(function (a, c) { return a.concat(c); });
        };
        ComplexDataObject.prototype.isEditSupport = function () {
            return this.uniqueKeyList().length > 0;
        };
        ComplexDataObject.prototype.isSame = function (another) {
            var keys = this.uniqueKeyList();
            if (keys.length <= 0)
                return false;
            else {
                var thisO = this.toObject(this);
                var anotherO = another.toObject(another);
                return keys.every(function (key) { return thisO[key] == anotherO[key]; });
            }
        };
        ComplexDataObject.prototype.hashCode = function () {
            var keys = this.uniqueKeyList();
            var o = this.toObject(this);
            if (keys.length > 0) {
                return JSON.stringify(keys.map(function (key) { return o[key]; }));
            }
            else {
                console.log("Warning : this hashCode might lead to collision");
                return JSON.stringify(o);
            }
        };
        ComplexDataObject.prototype.use_all_instance_list = function (consumer) {
            var instance = this;
            var producer = function (apiResult) {
                var resultCode = apiResult[0];
                var data = apiResult[1];
                if (resultCode == ResultCode.Success) {
                    var all_row = data[APIField.element_array];
                    return all_row.map(instance.parseObject);
                }
                else {
                    throw new APIParseResultError(resultCode);
                }
            };
            var handler = [producer, consumer];
            api.use_all_row(this.tableName(), handler);
        };
        //TODO to implement the filter logic on server (php)
        ComplexDataObject.prototype.use_fully_matched_instance_list = function (queryKeyValues, consumer) {
            throw new TypeError("Operation not support yet");
        };
        //TODO to implement the filter logic on server (php)
        ComplexDataObject.prototype.use_partially_matched_instance_list = function (queryKeyValues, consumer) {
            throw new TypeError("Operation not support yet");
        };
        return ComplexDataObject;
    })(stub.DataObject);
    stub.ComplexDataObject = ComplexDataObject;
})(stub || (stub = {}));
//# sourceMappingURL=ComplexDataObject.js.map