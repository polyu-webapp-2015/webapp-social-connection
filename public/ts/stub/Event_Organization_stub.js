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
        /* key */
        Event_Organization_stub.__event_id = function () {
            return "event_id";
        };
        Event_Organization_stub.__organization_id = function () {
            return "organization_id";
        };
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
        /* getter and setter */
        Event_Organization_stub.prototype.get_event_id = function () {
            return this.event_id;
        };
        Event_Organization_stub.prototype.set_event_id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_Organization_stub.prototype.get_organization_id = function () {
            return this.organization_id;
        };
        Event_Organization_stub.prototype.set_organization_id = function (newValue) {
            if (this.isEditSupport()) {
                this.organization_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Event_Organization_stub;
    })(stub.DataObject);
    stub.Event_Organization_stub = Event_Organization_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Event_Organization_stub.js.map