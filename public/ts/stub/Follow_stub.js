var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Follow_stub = (function (_super) {
        __extends(Follow_stub, _super);
        function Follow_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Follow_stub.__follow_id = function () {
            return "follow_id";
        };
        Follow_stub.__follower_account_id = function () {
            return "follower_account_id";
        };
        Follow_stub.__followed_account_id = function () {
            return "followed_account_id";
        };
        Follow_stub.__remark = function () {
            return "remark";
        };
        Follow_stub.__deleted = function () {
            return "deleted";
        };
        Follow_stub.__create_time = function () {
            return "create_time";
        };
        Follow_stub.__edit_time = function () {
            return "edit_time";
        };
        /* implement DataObject */
        Follow_stub.prototype.tableName = function () {
            return "Follow";
        };
        Follow_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("follow_id");
            return list;
        };
        Follow_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("follow_id");
            list.push("follower_account_id");
            list.push("followed_account_id");
            list.push("remark");
            list.push("deleted");
            list.push("create_time");
            list.push("edit_time");
            return list;
        };
        Follow_stub.prototype.parseObject = function (rawObject) {
            var instance = new Follow_stub();
            if (rawObject.hasOwnProperty('follow_id'))
                instance.follow_id = rawObject.follow_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('follower_account_id'))
                instance.follower_account_id = rawObject.follower_account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('followed_account_id'))
                instance.followed_account_id = rawObject.followed_account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('remark'))
                instance.remark = rawObject.remark;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('deleted'))
                instance.deleted = rawObject.deleted;
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
            return instance;
        };
        Follow_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Follow_stub.__follow_id()] = instance.follow_id;
            rawObject[Follow_stub.__follower_account_id()] = instance.follower_account_id;
            rawObject[Follow_stub.__followed_account_id()] = instance.followed_account_id;
            rawObject[Follow_stub.__remark()] = instance.remark;
            rawObject[Follow_stub.__deleted()] = instance.deleted;
            rawObject[Follow_stub.__create_time()] = instance.create_time;
            rawObject[Follow_stub.__edit_time()] = instance.edit_time;
            return rawObject;
        };
        /* getter and setter */
        Follow_stub.prototype.get_follow_id = function () {
            return this.follow_id * 1;
        };
        Follow_stub.prototype.set_follow_id = function (newValue) {
            if (this.isEditSupport()) {
                this.follow_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Follow_stub.prototype.get_follower_account_id = function () {
            return this.follower_account_id * 1;
        };
        Follow_stub.prototype.set_follower_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.follower_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Follow_stub.prototype.get_followed_account_id = function () {
            return this.followed_account_id * 1;
        };
        Follow_stub.prototype.set_followed_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.followed_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Follow_stub.prototype.get_remark = function () {
            return this.remark;
        };
        Follow_stub.prototype.set_remark = function (newValue) {
            if (this.isEditSupport()) {
                this.remark = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Follow_stub.prototype.get_deleted = function () {
            return this.deleted;
        };
        Follow_stub.prototype.set_deleted = function (newValue) {
            if (this.isEditSupport()) {
                this.deleted = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Follow_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        Follow_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Follow_stub.prototype.get_edit_time = function () {
            return this.edit_time;
        };
        Follow_stub.prototype.set_edit_time = function (newValue) {
            if (this.isEditSupport()) {
                this.edit_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Follow_stub;
    })(stub.DataObject);
    stub.Follow_stub = Follow_stub;
    stub.add_stub_instance(new Follow_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Follow_stub.js.map