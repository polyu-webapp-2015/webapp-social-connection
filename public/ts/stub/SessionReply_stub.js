var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var SessionReply_stub = (function (_super) {
        __extends(SessionReply_stub, _super);
        function SessionReply_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        SessionReply_stub.__reply_id = function () {
            return "reply_id";
        };
        SessionReply_stub.__event_Id = function () {
            return "event_Id";
        };
        SessionReply_stub.__message = function () {
            return "message";
        };
        SessionReply_stub.__creator_account_id = function () {
            return "creator_account_id";
        };
        SessionReply_stub.__editor_account_id = function () {
            return "editor_account_id";
        };
        SessionReply_stub.__create_time = function () {
            return "create_time";
        };
        SessionReply_stub.__edit_time = function () {
            return "edit_time";
        };
        SessionReply_stub.__deleted = function () {
            return "deleted";
        };
        /* implement DataObject */
        SessionReply_stub.prototype.tableName = function () {
            return "SessionReply";
        };
        SessionReply_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("reply_id");
            return list;
        };
        SessionReply_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("reply_id");
            list.push("event_Id");
            list.push("message");
            list.push("creator_account_id");
            list.push("editor_account_id");
            list.push("create_time");
            list.push("edit_time");
            list.push("deleted");
            return list;
        };
        SessionReply_stub.prototype.parseObject = function (rawObject) {
            var instance = new SessionReply_stub();
            if (rawObject.hasOwnProperty('reply_id'))
                instance.reply_id = rawObject.reply_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('event_Id'))
                instance.event_Id = rawObject.event_Id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('message'))
                instance.message = rawObject.message;
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
            if (rawObject.hasOwnProperty('create_time'))
                instance.create_time = rawObject.create_time;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('edit_time'))
                instance.edit_time = rawObject.edit_time;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('deleted'))
                instance.deleted = rawObject.deleted;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        SessionReply_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[SessionReply_stub.__reply_id()] = instance.reply_id;
            rawObject[SessionReply_stub.__event_Id()] = instance.event_Id;
            rawObject[SessionReply_stub.__message()] = instance.message;
            rawObject[SessionReply_stub.__creator_account_id()] = instance.creator_account_id;
            rawObject[SessionReply_stub.__editor_account_id()] = instance.editor_account_id;
            rawObject[SessionReply_stub.__create_time()] = instance.create_time;
            rawObject[SessionReply_stub.__edit_time()] = instance.edit_time;
            rawObject[SessionReply_stub.__deleted()] = instance.deleted;
            return rawObject;
        };
        /* getter and setter */
        SessionReply_stub.prototype.get_reply_id = function () {
            return this.reply_id * 1;
        };
        SessionReply_stub.prototype.set_reply_id = function (newValue) {
            if (this.isEditSupport()) {
                this.reply_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_event_Id = function () {
            return this.event_Id * 1;
        };
        SessionReply_stub.prototype.set_event_Id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_Id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_message = function () {
            return this.message;
        };
        SessionReply_stub.prototype.set_message = function (newValue) {
            if (this.isEditSupport()) {
                this.message = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_creator_account_id = function () {
            return this.creator_account_id * 1;
        };
        SessionReply_stub.prototype.set_creator_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.creator_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_editor_account_id = function () {
            return this.editor_account_id * 1;
        };
        SessionReply_stub.prototype.set_editor_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.editor_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        SessionReply_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_edit_time = function () {
            return this.edit_time;
        };
        SessionReply_stub.prototype.set_edit_time = function (newValue) {
            if (this.isEditSupport()) {
                this.edit_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        SessionReply_stub.prototype.get_deleted = function () {
            return this.deleted;
        };
        SessionReply_stub.prototype.set_deleted = function (newValue) {
            if (this.isEditSupport()) {
                this.deleted = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return SessionReply_stub;
    })(stub.DataObject);
    stub.SessionReply_stub = SessionReply_stub;
    stub.add_stub_instance(new SessionReply_stub());
})(stub || (stub = {}));
//# sourceMappingURL=SessionReply_stub.js.map