var stub;
(function (stub) {
    var DataObject = (function () {
        function DataObject() {
        }
        DataObject.prototype.isEditSupport = function () {
            return this.uniqueKeyList().length > 0;
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