var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Message_stub = (function (_super) {
        __extends(Message_stub, _super);
        function Message_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Message_stub.__msg_id = function () {
            return "msg_id";
        };
        Message_stub.__from_account_id = function () {
            return "from_account_id";
        };
        Message_stub.__to_account_id = function () {
            return "to_account_id";
        };
        Message_stub.__create_time = function () {
            return "create_time";
        };
        Message_stub.__read_time = function () {
            return "read_time";
        };
        /* implement DataObject */
        Message_stub.prototype.tableName = function () {
            return "Message";
        };
        Message_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("msg_id");
            return list;
        };
        Message_stub.prototype.parseObject = function (rawObject) {
            var instance = new Message_stub();
            if (rawObject.hasOwnProperty('msg_id'))
                instance.msg_id = rawObject.msg_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('from_account_id'))
                instance.from_account_id = rawObject.from_account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('to_account_id'))
                instance.to_account_id = rawObject.to_account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('create_time'))
                instance.create_time = rawObject.create_time;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('read_time'))
                instance.read_time = rawObject.read_time;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Message_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Message_stub.__msg_id()] = instance.msg_id;
            rawObject[Message_stub.__from_account_id()] = instance.from_account_id;
            rawObject[Message_stub.__to_account_id()] = instance.to_account_id;
            rawObject[Message_stub.__create_time()] = instance.create_time;
            rawObject[Message_stub.__read_time()] = instance.read_time;
            return rawObject;
        };
        /* getter and setter */
        Message_stub.prototype.get_msg_id = function () {
            return this.msg_id;
        };
        Message_stub.prototype.set_msg_id = function (newValue) {
            if (this.isEditSupport()) {
                this.msg_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Message_stub.prototype.get_from_account_id = function () {
            return this.from_account_id;
        };
        Message_stub.prototype.set_from_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.from_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Message_stub.prototype.get_to_account_id = function () {
            return this.to_account_id;
        };
        Message_stub.prototype.set_to_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.to_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Message_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        Message_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Message_stub.prototype.get_read_time = function () {
            return this.read_time;
        };
        Message_stub.prototype.set_read_time = function (newValue) {
            if (this.isEditSupport()) {
                this.read_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Message_stub;
    })(stub.DataObject);
    stub.Message_stub = Message_stub;
    stub.add_stub_instance(new Message_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Message_stub.js.map