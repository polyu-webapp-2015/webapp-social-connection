var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Post_stub = (function (_super) {
        __extends(Post_stub, _super);
        function Post_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Post_stub.__post_Id = function () {
            return "post_Id";
        };
        Post_stub.__subject = function () {
            return "subject";
        };
        Post_stub.__description = function () {
            return "description";
        };
        Post_stub.__discussboard_id = function () {
            return "discussboard_id";
        };
        Post_stub.__creator_account_id = function () {
            return "creator_account_id";
        };
        Post_stub.__editor_account_id = function () {
            return "editor_account_id";
        };
        Post_stub.__create_time = function () {
            return "create_time";
        };
        Post_stub.__edit_time = function () {
            return "edit_time";
        };
        Post_stub.__deleted = function () {
            return "deleted";
        };
        /* implement DataObject */
        Post_stub.prototype.tableName = function () {
            return "Post";
        };
        Post_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("post_Id");
            return list;
        };
        Post_stub.prototype.parseObject = function (rawObject) {
            var instance = new Post_stub();
            if (rawObject.hasOwnProperty('post_Id'))
                instance.post_Id = rawObject.post_Id;
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
            if (rawObject.hasOwnProperty('discussboard_id'))
                instance.discussboard_id = rawObject.discussboard_id;
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
        Post_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Post_stub.__post_Id()] = instance.post_Id;
            rawObject[Post_stub.__subject()] = instance.subject;
            rawObject[Post_stub.__description()] = instance.description;
            rawObject[Post_stub.__discussboard_id()] = instance.discussboard_id;
            rawObject[Post_stub.__creator_account_id()] = instance.creator_account_id;
            rawObject[Post_stub.__editor_account_id()] = instance.editor_account_id;
            rawObject[Post_stub.__create_time()] = instance.create_time;
            rawObject[Post_stub.__edit_time()] = instance.edit_time;
            rawObject[Post_stub.__deleted()] = instance.deleted;
            return rawObject;
        };
        /* getter and setter */
        Post_stub.prototype.get_post_Id = function () {
            return this.post_Id * 1;
        };
        Post_stub.prototype.set_post_Id = function (newValue) {
            if (this.isEditSupport()) {
                this.post_Id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_subject = function () {
            return this.subject;
        };
        Post_stub.prototype.set_subject = function (newValue) {
            if (this.isEditSupport()) {
                this.subject = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_description = function () {
            return this.description;
        };
        Post_stub.prototype.set_description = function (newValue) {
            if (this.isEditSupport()) {
                this.description = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_discussboard_id = function () {
            return this.discussboard_id * 1;
        };
        Post_stub.prototype.set_discussboard_id = function (newValue) {
            if (this.isEditSupport()) {
                this.discussboard_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_creator_account_id = function () {
            return this.creator_account_id * 1;
        };
        Post_stub.prototype.set_creator_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.creator_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_editor_account_id = function () {
            return this.editor_account_id * 1;
        };
        Post_stub.prototype.set_editor_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.editor_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        Post_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_edit_time = function () {
            return this.edit_time;
        };
        Post_stub.prototype.set_edit_time = function (newValue) {
            if (this.isEditSupport()) {
                this.edit_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_deleted = function () {
            return this.deleted;
        };
        Post_stub.prototype.set_deleted = function (newValue) {
            if (this.isEditSupport()) {
                this.deleted = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Post_stub;
    })(stub.DataObject);
    stub.Post_stub = Post_stub;
    stub.add_stub_instance(new Post_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Post_stub.js.map