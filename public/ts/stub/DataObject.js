///<reference path="../api.ts"/>
///<reference path="../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../debug.ts"/>
///<reference path="../DataObjectManager.ts"/>
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
    })(TypeError);
    stub.DataObjectError = DataObjectError;
    var DataObjectEditError = (function (_super) {
        __extends(DataObjectEditError, _super);
        function DataObjectEditError(dataObject, message) {
            if (message === void 0) { message = "This Object (" + dataObject.tableName() + ") can not be edited"; }
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
            if (message === void 0) { message = "Failed to save this object (" + dataObject.tableName() + ")"; }
            _super.call(this, dataObject, message);
            this.dataObject = dataObject;
            this.message = message;
            this.name = "DataObjectSaveError";
        }
        return DataObjectSaveError;
    })(DataObjectError);
    stub.DataObjectSaveError = DataObjectSaveError;
    var DataObjectParseError = (function (_super) {
        __extends(DataObjectParseError, _super);
        function DataObjectParseError(dataObject, message) {
            if (message === void 0) { message = "Failed to parse this object (" + dataObject.tableName() + ")"; }
            _super.call(this, dataObject, message);
            this.dataObject = dataObject;
            this.message = message;
            this.name = "DataObjectParseError";
        }
        return DataObjectParseError;
    })(DataObjectError);
    stub.DataObjectParseError = DataObjectParseError;
    var DataObject = (function () {
        function DataObject() {
        }
        //public isEveryMatch(patterns:KeyValue[]):boolean {
        //  return patterns.every(pair=>this.getValueByKey(pair[0]) == pair[1]);
        //}
        //public isSomeMatch(patterns:KeyValue[]|KeyValue):boolean {
        //  return patterns.some(pair=>this.getValueByKey(pair[0]) == pair[1]);
        //}
        /**@deprecated will lead to bug on composited table */
        DataObject.prototype.toObjectWithoutUniqueKeys = function (instance) {
            if (instance === void 0) { instance = this; }
            var fullObject = this.toObject(instance);
            var resultObject = {};
            var uniqueKeys = instance.uniqueKeyList();
            var targetKeys = instance.allKeyList().filter(function (key) { return uniqueKeys.every(function (uniqueKey) { return uniqueKey != key; }); });
            return lang.DictionaryHelper.filter(fullObject, function (kv) { return targetKeys.some(function (key) { return key == kv[0]; }); });
        };
        DataObject.prototype.isComplex = function () {
            return false;
        };
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
                utils.log("Warning : this hashCode might lead to collision (" + this.tableName() + ")");
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
        /**
         * @remark should be override by subclass (ComplexDataObject)
         * @deprecated this method does not support N-N relationship middle table (e.g. Event_Attendee) (composited table)
         * */
        DataObject.prototype.create_rows_on_server = function (dataObjects, consumer) {
            if (dataObjects === void 0) { dataObjects = [this]; }
            var raw_array = dataObjects.map(function (dataObject) { return dataObject.toObjectWithoutUniqueKeys(); });
            this.create_rows_on_server_from_raw(raw_array, consumer);
        };
        DataObject.prototype.create_rows_on_server_from_raw = function (raw_array, consumer) {
            var instance = this;
            if (raw_array.length > 0) {
                var row_array = raw_array;
                var producer = function (apiResult) {
                    var resultCode = apiResult[0];
                    var data = apiResult[1];
                    if (resultCode == ResultCode.Success) {
                        return data[APIField.id_array];
                    }
                    else {
                        throw new APIParseResultError(resultCode);
                    }
                };
                var postProcess = function (ts) {
                    consumer(ts);
                    DataObjectManager.request(this, function () {
                        return true;
                    }, function () {
                    }, true);
                };
                var handler = [producer, postProcess];
                api.create_all_row(this.tableName(), row_array, handler);
            }
            else {
                consumer([]);
            }
        };
        //TODO to implement the filter logic on server (php)
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
    var stub_instance_list = [];
    function add_stub_instance(instance) {
        //utils.log("adding " + instance.tableName());
        if (!stub_instance_list.some(function (e) { return e.tableName() == instance.tableName(); }))
            stub_instance_list.push(instance);
    }
    stub.add_stub_instance = add_stub_instance;
    function match_by_tableName(table_name, prefix) {
        if (prefix === void 0) { prefix = ""; }
        var target = table_name.toLowerCase();
        return stub_instance_list.filter(function (e) { return (prefix + e.tableName()).toLowerCase() == target; });
    }
    stub.match_by_tableName = match_by_tableName;
})(stub || (stub = {}));
//# sourceMappingURL=DataObject.js.map