var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stub;
(function (stub) {
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
        DataObject.prototype.isEditSupport = function () {
            return this.uniqueKeyList().length > 0;
        };
        DataObject.prototype.save = function ($http) {
            this.save_all($http, [this]);
        };
        DataObject.prototype.save_all = function ($http, dataObjects) {
            if (this.isEditSupport()) {
                var rawObjects = dataObjects.map(function (dataObject) {
                    return dataObject.toObject(dataObject);
                });
                set_all_row($http, this.tableName(), rawObjects);
            }
            else {
                throw new DataObjectSaveError(this);
            }
        };
        DataObject.prototype.get_all_instance_list = function ($http) {
            var _this = this;
            var all_row = get_all_row($http, this.tableName());
            return all_row.map(function (row) { return _this.parseObject(row); });
        };
        DataObject.prototype.get_matched_instance_list = function ($http, query_key_value_array) {
            throw new TypeError("Operation not support yet");
        };
        return DataObject;
    })();
    stub.DataObject = DataObject;
})(stub || (stub = {}));
//# sourceMappingURL=DataObject.js.map