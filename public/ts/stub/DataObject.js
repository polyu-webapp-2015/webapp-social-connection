///<reference path="../api.ts"/>
///<reference path="../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../debug.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stub;
(function (stub) {
    var APIParseResultError = debug.APIParseResultError;
    var DataObjectError = (function (_super) {
        __extends(DataObjectError, _super);
        function DataObjectError(dataObject, message) {
            _super.call(this, message);
            this.dataObject = dataObject;
            this.message = message;
            this.name = "DataObjectError";
        }
        return DataObjectError;
    })(Error);
    stub.DataObjectError = DataObjectError;
    var DataObjectEditError = (function (_super) {
        __extends(DataObjectEditError, _super);
        function DataObjectEditError(dataObject, message) {
            if (message === void 0) { message = "This Object can not be edited"; }
            _super.call(this, dataObject, message);
            this.dataObject = dataObject;
            this.message = message;
            this.name = "DataObjectEditError";
        }
        return DataObjectEditError;
    })(DataObjectError);
    stub.DataObjectEditError = DataObjectEditError;
    var DataObjectSaveError = (function (_super) {
        __extends(DataObjectSaveError, _super);
        function DataObjectSaveError(dataObject, message) {
            if (message === void 0) { message = "Failed to save this object"; }
            _super.call(this, dataObject, message);
            this.dataObject = dataObject;
            this.message = message;
            this.name = "DataObjectSaveError";
        }
        return DataObjectSaveError;
    })(DataObjectError);
    stub.DataObjectSaveError = DataObjectSaveError;
    var DataObject = (function () {
        function DataObject() {
        }
        //public isEveryMatch(patterns:KeyValue[]):boolean {
        //  return patterns.every(pair=>this.getValueByKey(pair[0]) == pair[1]);
        //}
        //public isSomeMatch(patterns:KeyValue[]|KeyValue):boolean {
        //  return patterns.some(pair=>this.getValueByKey(pair[0]) == pair[1]);
        //}
        DataObject.prototype.isEditSupport = function () {
            return this.uniqueKeyList().length > 0;
        };
        //TODO implement faster method (direct compare in subclass)
        DataObject.prototype.isSame = function (another) {
            var keys = this.uniqueKeyList();
            if (keys.length <= 0)
                return false;
            else {
                var thisO = this.toObject(this);
                var anotherO = another.toObject(another);
                return keys.every(function (key) { return thisO[key] == anotherO[key]; });
            }
        };
        DataObject.prototype.hashCode = function () {
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
        DataObject.prototype.save = function ($http) {
            this.save_all($http, [this]);
        };
        DataObject.prototype.save_all = function ($http, dataObjects) {
            if (this.isEditSupport()) {
                var rawObjects = dataObjects.map(function (dataObject) {
                    return dataObject.toObject(dataObject);
                });
                api.set_all_row(this.tableName(), rawObjects);
            }
            else {
                throw new DataObjectSaveError(this);
            }
        };
        DataObject.prototype.use_all_instance_list = function (consumer) {
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
        //TODO to implment the filter logic on server (php)
        DataObject.prototype.use_fully_matched_instance_list = function (queryKeyValues, consumer) {
            throw new TypeError("Operation not support yet");
            //var applier:Consumer<DataObject[]> = function (fullList:DataObject[]) {
            //  consumer(fullList.filter(function (dataObject:DataObject) {
            //    return dataObject.isEveryMatch(queryKeyValues);
            //  }));
            //};
            //this.use_all_instance_list(applier);
        };
        //TODO to implement the filter logic on server (php)
        DataObject.prototype.use_partially_matched_instance_list = function (queryKeyValues, consumer) {
            throw new TypeError("Operation not support yet");
        };
        return DataObject;
    })();
    stub.DataObject = DataObject;
})(stub || (stub = {}));
//# sourceMappingURL=DataObject.js.map