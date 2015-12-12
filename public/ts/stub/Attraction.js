var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Attraction_stub = (function (_super) {
        __extends(Attraction_stub, _super);
        function Attraction_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Attraction_stub.prototype.tableName = function () {
            return "Attraction";
        };
        Attraction_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Attraction_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Attraction_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Attraction_stub.__event_id = "event_id";
        return Attraction_stub;
    })(stub.DataObject);
    stub.Attraction_stub = Attraction_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Attraction.js.map