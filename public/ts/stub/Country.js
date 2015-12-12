var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Country_stub = (function (_super) {
        __extends(Country_stub, _super);
        function Country_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Country_stub.prototype.tableName = function () {
            return "Country";
        };
        Country_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("country_id");
            list.push("country_name");
            return list;
        };
        Country_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Country_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Country_stub.__country_id = "country_id";
        Country_stub.__country_name = "country_name";
        return Country_stub;
    })(stub.DataObject);
    stub.Country_stub = Country_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Country.js.map