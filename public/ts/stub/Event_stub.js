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
        Event_stub.__quota = function () {
            return "quota";
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
        Event_stub.prototype.allKeyList = function () {
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
            list.push("quota");
            return list;
        };
        Event_stub.prototype.parseObject = function (rawObject) {
            var instance = new Event_stub();
            if (rawObject.hasOwnProperty('event_id'))
                instance.event_id = rawObject.event_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('create_time'))
                instance.create_time = rawObject.create_time;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('edit_time'))
                instance.edit_time = rawObject.edit_time;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('event_type'))
                instance.event_type = rawObject.event_type;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('venue_id'))
                instance.venue_id = rawObject.venue_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('event_time'))
                instance.event_time = rawObject.event_time;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('creator_account_id'))
                instance.creator_account_id = rawObject.creator_account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('editor_account_id'))
                instance.editor_account_id = rawObject.editor_account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('subject'))
                instance.subject = rawObject.subject;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('description'))
                instance.description = rawObject.description;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('quota'))
                instance.quota = rawObject.quota;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Event_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Event_stub.__event_id()] = instance.event_id;
            rawObject[Event_stub.__create_time()] = instance.create_time;
            rawObject[Event_stub.__edit_time()] = instance.edit_time;
            rawObject[Event_stub.__event_type()] = instance.event_type;
            rawObject[Event_stub.__venue_id()] = instance.venue_id;
            rawObject[Event_stub.__event_time()] = instance.event_time;
            rawObject[Event_stub.__creator_account_id()] = instance.creator_account_id;
            rawObject[Event_stub.__editor_account_id()] = instance.editor_account_id;
            rawObject[Event_stub.__subject()] = instance.subject;
            rawObject[Event_stub.__description()] = instance.description;
            rawObject[Event_stub.__quota()] = instance.quota;
            return rawObject;
        };
        /* getter and setter */
        Event_stub.prototype.get_event_id = function () {
            return this.event_id * 1;
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
            return this.venue_id * 1;
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
            return this.creator_account_id * 1;
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
            return this.editor_account_id * 1;
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
        Event_stub.prototype.get_quota = function () {
            return this.quota * 1;
        };
        Event_stub.prototype.set_quota = function (newValue) {
            if (this.isEditSupport()) {
                this.quota = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Event_stub;
    })(stub.DataObject);
    stub.Event_stub = Event_stub;
    stub.add_stub_instance(new Event_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Event_stub.js.map