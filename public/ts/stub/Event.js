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
        /* key */
        Event_stub.__event_id = function () {
            return "event_id";
        };
        Event_stub.__create_time = function () {
            return "create_time";
        };
        Event_stub.__edit_time = function () {
            return "edit_time";
        };
        Event_stub.__event_type = function () {
            return "event_type";
        };
        Event_stub.__venue_id = function () {
            return "venue_id";
        };
        Event_stub.__event_time = function () {
            return "event_time";
        };
        Event_stub.__creator_account_id = function () {
            return "creator_account_id";
        };
        Event_stub.__editor_account_id = function () {
            return "editor_account_id";
        };
        Event_stub.__subject = function () {
            return "subject";
        };
        Event_stub.__description = function () {
            return "description";
        };
        /* implement DataObject */
        Event_stub.prototype.tableName = function () {
            return "Event";
        };
        Event_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Event_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Event_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* getter and setter */
        Event_stub.prototype.get_event_id = function () {
            return this.event_id;
        };
        Event_stub.prototype.set_event_id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        Event_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_edit_time = function () {
            return this.edit_time;
        };
        Event_stub.prototype.set_edit_time = function (newValue) {
            if (this.isEditSupport()) {
                this.edit_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_event_type = function () {
            return this.event_type;
        };
        Event_stub.prototype.set_event_type = function (newValue) {
            if (this.isEditSupport()) {
                this.event_type = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_venue_id = function () {
            return this.venue_id;
        };
        Event_stub.prototype.set_venue_id = function (newValue) {
            if (this.isEditSupport()) {
                this.venue_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_event_time = function () {
            return this.event_time;
        };
        Event_stub.prototype.set_event_time = function (newValue) {
            if (this.isEditSupport()) {
                this.event_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_creator_account_id = function () {
            return this.creator_account_id;
        };
        Event_stub.prototype.set_creator_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.creator_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_editor_account_id = function () {
            return this.editor_account_id;
        };
        Event_stub.prototype.set_editor_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.editor_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_subject = function () {
            return this.subject;
        };
        Event_stub.prototype.set_subject = function (newValue) {
            if (this.isEditSupport()) {
                this.subject = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Event_stub.prototype.get_description = function () {
            return this.description;
        };
        Event_stub.prototype.set_description = function (newValue) {
            if (this.isEditSupport()) {
                this.description = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Event_stub;
    })(stub.DataObject);
    stub.Event_stub = Event_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Event.js.map