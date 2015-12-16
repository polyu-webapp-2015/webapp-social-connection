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
        /* key */
        City_stub.__city_id = function () {
            return "city_id";
        };
        City_stub.__country_id = function () {
            return "country_id";
        };
        City_stub.__city_name = function () {
            return "city_name";
        };
        /* implement DataObject */
        City_stub.prototype.tableName = function () {
            return "City";
        };
        City_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("city_id");
            list.push("city_name");
            return list;
        };
        City_stub.prototype.parseObject = function (rawObject) {
            var instance = new City_stub();
            instance.city_id = rawObject.city_id;
            instance.country_id = rawObject.country_id;
            instance.city_name = rawObject.city_name;
            return instance;
        };
        City_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[City_stub.__city_id()] = instance.city_id;
            rawObject[City_stub.__country_id()] = instance.country_id;
            rawObject[City_stub.__city_name()] = instance.city_name;
            return rawObject;
        };
        /* getter and setter */
        City_stub.prototype.get_city_id = function () {
            return this.city_id;
        };
        City_stub.prototype.set_city_id = function (newValue) {
            if (this.isEditSupport()) {
                this.city_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        City_stub.prototype.get_country_id = function () {
            return this.country_id;
        };
        City_stub.prototype.set_country_id = function (newValue) {
            if (this.isEditSupport()) {
                this.country_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        City_stub.prototype.get_city_name = function () {
            return this.city_name;
        };
        City_stub.prototype.set_city_name = function (newValue) {
            if (this.isEditSupport()) {
                this.city_name = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return City_stub;
    })(stub.DataObject);
    stub.City_stub = City_stub;
})(stub || (stub = {}));
//# sourceMappingURL=City_stub.js.map