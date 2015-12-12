var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Event_Attendee_stub = (function (_super) {
        __extends(Event_Attendee_stub, _super);
        function Event_Attendee_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Event_Attendee_stub.prototype.tableName = function () {
            return "Event_Attendee";
        };
        Event_Attendee_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            list.push("account_id");
            return list;
        };
        Event_Attendee_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Event_Attendee_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Event_Attendee_stub.__event_id = "event_id";
        Event_Attendee_stub.__account_id = "account_id";
        return Event_Attendee_stub;
    })(stub.DataObject);
    stub.Event_Attendee_stub = Event_Attendee_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Event_Attendee.js.map