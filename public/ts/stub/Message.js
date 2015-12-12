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
        /* implement DataObject */
        Message_stub.prototype.tableName = function () {
            return "Message";
        };
        Message_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("msg_id");
            list.push("from_account_id");
            list.push("to_account_id");
            list.push("create_time");
            list.push("read_time");
            return list;
        };
        Message_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Message_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Message_stub.__msg_id = "msg_id";
        Message_stub.__from_account_id = "from_account_id";
        Message_stub.__to_account_id = "to_account_id";
        Message_stub.__create_time = "create_time";
        Message_stub.__read_time = "read_time";
        return Message_stub;
    })(stub.DataObject);
    stub.Message_stub = Message_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Message.js.map