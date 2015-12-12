var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var City_stub = (function (_super) {
        __extends(City_stub, _super);
        function City_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        City_stub.prototype.tableName = function () {
            return "City";
        };
        City_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("city_id");
            list.push("country_id");
            list.push("city_name");
            return list;
        };
        City_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        City_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        City_stub.__city_id = "city_id";
        City_stub.__country_id = "country_id";
        City_stub.__city_name = "city_name";
        return City_stub;
    })(stub.DataObject);
    stub.City_stub = City_stub;
})(stub || (stub = {}));
//# sourceMappingURL=City.js.map