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
        /* implement DataObject */
        Floor_stub.prototype.tableName = function () {
            return "Floor";
        };
        Floor_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("floor_id");
            list.push("name");
            return list;
        };
        Floor_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Floor_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Floor_stub.__floor_id = "floor_id";
        Floor_stub.__name = "name";
        return Floor_stub;
    })(stub.DataObject);
    stub.Floor_stub = Floor_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Floor.js.map