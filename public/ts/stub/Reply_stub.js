var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Reply_stub = (function (_super) {
        __extends(Reply_stub, _super);
        function Reply_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Reply_stub.__reply_id = function () {
            return "reply_id";
        };
        Reply_stub.__post_Id = function () {
            return "post_Id";
        };
        Reply_stub.__message = function () {
            return "message";
        };
        Reply_stub.__creator_account_id = function () {
            return "creator_account_id";
        };
        Reply_stub.__editor_account_id = function () {
            return "editor_account_id";
        };
        Reply_stub.__create_time = function () {
            return "create_time";
        };
        Reply_stub.__edit_time = function () {
            return "edit_time";
        };
        Reply_stub.__deleted = function () {
            return "deleted";
        };
        /* implement DataObject */
        Reply_stub.prototype.tableName = function () {
            return "Reply";
        };
        Reply_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("reply_id");
            return list;
        };
        Reply_stub.prototype.parseObject = function (rawObject) {
            var instance = new Reply_stub();
            if (rawObject.hasOwnProperty('reply_id'))
                instance.reply_id = rawObject.reply_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('post_Id'))
                instance.post_Id = rawObject.post_Id;
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
        Reply_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Reply_stub.__reply_id()] = instance.reply_id;
            rawObject[Reply_stub.__post_Id()] = instance.post_Id;
            rawObject[Reply_stub.__message()] = instance.message;
            rawObject[Reply_stub.__creator_account_id()] = instance.creator_account_id;
            rawObject[Reply_stub.__editor_account_id()] = instance.editor_account_id;
            rawObject[Reply_stub.__create_time()] = instance.create_time;
            rawObject[Reply_stub.__edit_time()] = instance.edit_time;
            rawObject[Reply_stub.__deleted()] = instance.deleted;
            return rawObject;
        };
        /* getter and setter */
        Reply_stub.prototype.get_reply_id = function () {
            return this.reply_id * 1;
        };
        Reply_stub.prototype.set_reply_id = function (newValue) {
            if (this.isEditSupport()) {
                this.reply_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_post_Id = function () {
            return this.post_Id * 1;
        };
        Reply_stub.prototype.set_post_Id = function (newValue) {
            if (this.isEditSupport()) {
                this.post_Id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_message = function () {
            return this.message;
        };
        Reply_stub.prototype.set_message = function (newValue) {
            if (this.isEditSupport()) {
                this.message = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_creator_account_id = function () {
            return this.creator_account_id * 1;
        };
        Reply_stub.prototype.set_creator_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.creator_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_editor_account_id = function () {
            return this.editor_account_id * 1;
        };
        Reply_stub.prototype.set_editor_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.editor_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        Reply_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_edit_time = function () {
            return this.edit_time;
        };
        Reply_stub.prototype.set_edit_time = function (newValue) {
            if (this.isEditSupport()) {
                this.edit_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reply_stub.prototype.get_deleted = function () {
            return this.deleted;
        };
        Reply_stub.prototype.set_deleted = function (newValue) {
            if (this.isEditSupport()) {
                this.deleted = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Reply_stub;
    })(stub.DataObject);
    stub.Reply_stub = Reply_stub;
    stub.add_stub_instance(new Reply_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Reply_stub.js.map