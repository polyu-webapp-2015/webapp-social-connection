var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Event_Organization_stub = (function (_super) {
        __extends(Event_Organization_stub, _super);
        function Event_Organization_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Event_Organization_stub.prototype.tableName = function () {
            return "Event_Organization";
        };
        Event_Organization_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            list.push("organization_id");
            return list;
        };
        Event_Organization_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Event_Organization_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Event_Organization_stub.__event_id = "event_id";
        Event_Organization_stub.__organization_id = "organization_id";
        return Event_Organization_stub;
    })(stub.DataObject);
    stub.Event_Organization_stub = Event_Organization_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Event_Organization.js.map