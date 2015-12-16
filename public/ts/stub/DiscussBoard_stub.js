var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var DiscussBoard_stub = (function (_super) {
        __extends(DiscussBoard_stub, _super);
        function DiscussBoard_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        DiscussBoard_stub.__discussboard_id = function () {
            return "discussboard_id";
        };
        DiscussBoard_stub.__subject = function () {
            return "subject";
        };
        DiscussBoard_stub.__description = function () {
            return "description";
        };
        DiscussBoard_stub.__creator_account_id = function () {
            return "creator_account_id";
        };
        DiscussBoard_stub.__editor_account_id = function () {
            return "editor_account_id";
        };
        DiscussBoard_stub.__create_time = function () {
            return "create_time";
        };
        DiscussBoard_stub.__edit_time = function () {
            return "edit_time";
        };
        DiscussBoard_stub.__deleted = function () {
            return "deleted";
        };
        /* implement DataObject */
        DiscussBoard_stub.prototype.tableName = function () {
            return "DiscussBoard";
        };
        DiscussBoard_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("discussboard_id");
            return list;
        };
        DiscussBoard_stub.prototype.parseObject = function (rawObject) {
            var instance = new DiscussBoard_stub();
            if (rawObject.hasOwnProperty('discussboard_id'))
                instance.discussboard_id = rawObject.discussboard_id;
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
        DiscussBoard_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[DiscussBoard_stub.__discussboard_id()] = instance.discussboard_id;
            rawObject[DiscussBoard_stub.__subject()] = instance.subject;
            rawObject[DiscussBoard_stub.__description()] = instance.description;
            rawObject[DiscussBoard_stub.__creator_account_id()] = instance.creator_account_id;
            rawObject[DiscussBoard_stub.__editor_account_id()] = instance.editor_account_id;
            rawObject[DiscussBoard_stub.__create_time()] = instance.create_time;
            rawObject[DiscussBoard_stub.__edit_time()] = instance.edit_time;
            rawObject[DiscussBoard_stub.__deleted()] = instance.deleted;
            return rawObject;
        };
        /* getter and setter */
        DiscussBoard_stub.prototype.get_discussboard_id = function () {
            return this.discussboard_id;
        };
        DiscussBoard_stub.prototype.set_discussboard_id = function (newValue) {
            if (this.isEditSupport()) {
                this.discussboard_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_subject = function () {
            return this.subject;
        };
        DiscussBoard_stub.prototype.set_subject = function (newValue) {
            if (this.isEditSupport()) {
                this.subject = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_description = function () {
            return this.description;
        };
        DiscussBoard_stub.prototype.set_description = function (newValue) {
            if (this.isEditSupport()) {
                this.description = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_creator_account_id = function () {
            return this.creator_account_id;
        };
        DiscussBoard_stub.prototype.set_creator_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.creator_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_editor_account_id = function () {
            return this.editor_account_id;
        };
        DiscussBoard_stub.prototype.set_editor_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.editor_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        DiscussBoard_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_edit_time = function () {
            return this.edit_time;
        };
        DiscussBoard_stub.prototype.set_edit_time = function (newValue) {
            if (this.isEditSupport()) {
                this.edit_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_deleted = function () {
            return this.deleted;
        };
        DiscussBoard_stub.prototype.set_deleted = function (newValue) {
            if (this.isEditSupport()) {
                this.deleted = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return DiscussBoard_stub;
    })(stub.DataObject);
    stub.DiscussBoard_stub = DiscussBoard_stub;
    stub.add_stub_instance(new DiscussBoard_stub());
})(stub || (stub = {}));
//# sourceMappingURL=DiscussBoard_stub.js.map