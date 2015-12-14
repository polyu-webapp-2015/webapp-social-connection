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
        Reply_stub.__account_id = function () {
            return "account_id";
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
            instance.reply_id = rawObject.reply_id;
            instance.post_Id = rawObject.post_Id;
            instance.message = rawObject.message;
            instance.account_id = rawObject.account_id;
            return instance;
        };
        Reply_stub.prototype.toObject = function (instance) {
            if (instance == null)
                instance = this;
            var rawObject = {};
            rawObject[Reply_stub.__reply_id()] = instance.reply_id;
            rawObject[Reply_stub.__post_Id()] = instance.post_Id;
            rawObject[Reply_stub.__message()] = instance.message;
            rawObject[Reply_stub.__account_id()] = instance.account_id;
            return rawObject;
        };
        /* getter and setter */
        Reply_stub.prototype.get_reply_id = function () {
            return this.reply_id;
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
            return this.post_Id;
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
        Reply_stub.prototype.get_account_id = function () {
            return this.account_id;
        };
        Reply_stub.prototype.set_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Reply_stub;
    })(stub.DataObject);
    stub.Reply_stub = Reply_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Reply_stub.js.map