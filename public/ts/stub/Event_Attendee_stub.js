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
        /* key */
        Event_Attendee_stub.__event_id = function () {
            return "event_id";
        };
        Event_Attendee_stub.__account_id = function () {
            return "account_id";
        };
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
        /* getter and setter */
        Event_Attendee_stub.prototype.get_event_id = function () {
            return this.event_id;
        };
        Event_Attendee_stub.prototype.set_event_id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_Attendee_stub.prototype.get_account_id = function () {
            return this.account_id;
        };
        Event_Attendee_stub.prototype.set_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Event_Attendee_stub;
    })(stub.DataObject);
    stub.Event_Attendee_stub = Event_Attendee_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Event_Attendee_stub.js.map