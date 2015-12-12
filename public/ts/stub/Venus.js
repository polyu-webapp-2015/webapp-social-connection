var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Venus_stub = (function (_super) {
        __extends(Venus_stub, _super);
        function Venus_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Venus_stub.prototype.tableName = function () {
            return "Venus";
        };
        Venus_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("venue_id");
            list.push("floor_id");
            return list;
        };
        Venus_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Venus_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Venus_stub.__venue_id = "venue_id";
        Venus_stub.__floor_id = "floor_id";
        return Venus_stub;
    })(stub.DataObject);
    stub.Venus_stub = Venus_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Venus.js.map