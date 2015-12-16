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
            var instance = new Event_Organization_stub();
            if (rawObject.hasOwnProperty('event_id'))
                instance.event_id = rawObject.event_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('organization_id'))
                instance.organization_id = rawObject.organization_id;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Event_Organization_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Event_Organization_stub.__event_id()] = instance.event_id;
            rawObject[Event_Organization_stub.__organization_id()] = instance.organization_id;
            return rawObject;
        };
        /* getter and setter */
        Event_Organization_stub.prototype.get_event_id = function () {
            return this.event_id * 1;
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
            return this.organization_id * 1;
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
    stub.add_stub_instance(new Event_Organization_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Event_Organization_stub.js.map