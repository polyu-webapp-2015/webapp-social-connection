var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Floor_stub = (function (_super) {
        __extends(Floor_stub, _super);
        function Floor_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Floor_stub.__floor_id = function () {
            return "floor_id";
        };
        Floor_stub.__floor_name = function () {
            return "floor_name";
        };
        /* implement DataObject */
        Floor_stub.prototype.tableName = function () {
            return "Floor";
        };
        Floor_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("floor_id");
            return list;
        };
        Floor_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("floor_id");
            list.push("floor_name");
            return list;
        };
        Floor_stub.prototype.parseObject = function (rawObject) {
            var instance = new Floor_stub();
            if (rawObject.hasOwnProperty('floor_id'))
                instance.floor_id = rawObject.floor_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('floor_name'))
                instance.floor_name = rawObject.floor_name;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Floor_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Floor_stub.__floor_id()] = instance.floor_id;
            rawObject[Floor_stub.__floor_name()] = instance.floor_name;
            return rawObject;
        };
        /* getter and setter */
        Floor_stub.prototype.get_floor_id = function () {
            return this.floor_id * 1;
        };
        Floor_stub.prototype.set_floor_id = function (newValue) {
            if (this.isEditSupport()) {
                this.floor_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Floor_stub.prototype.get_floor_name = function () {
            return this.floor_name;
        };
        Floor_stub.prototype.set_floor_name = function (newValue) {
            if (this.isEditSupport()) {
                this.floor_name = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Floor_stub;
    })(stub.DataObject);
    stub.Floor_stub = Floor_stub;
    stub.add_stub_instance(new Floor_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Floor_stub.js.map