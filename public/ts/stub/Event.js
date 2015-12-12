var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Event_stub = (function (_super) {
        __extends(Event_stub, _super);
        function Event_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Event_stub.prototype.tableName = function () {
            return "Event";
        };
        Event_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            list.push("create_time");
            list.push("edit_time");
            list.push("event_type");
            list.push("venue_id");
            list.push("event_time");
            list.push("creator_account_id");
            list.push("editor_account_id");
            list.push("subject");
            list.push("description");
            return list;
        };
        Event_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Event_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Event_stub.__event_id = "event_id";
        Event_stub.__create_time = "create_time";
        Event_stub.__edit_time = "edit_time";
        Event_stub.__event_type = "event_type";
        Event_stub.__venue_id = "venue_id";
        Event_stub.__event_time = "event_time";
        Event_stub.__creator_account_id = "creator_account_id";
        Event_stub.__editor_account_id = "editor_account_id";
        Event_stub.__subject = "subject";
        Event_stub.__description = "description";
        return Event_stub;
    })(stub.DataObject);
    stub.Event_stub = Event_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Event.js.map