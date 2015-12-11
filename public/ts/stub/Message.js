var Message_stub = (function () {
    function Message_stub() {
    }
    Message_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Message_stub.parseObject = function (rawObject) {
        //TODO
        var myMessage = new Message();
        myMessage.msg_id = rawObject.msg_id;
        myMessage.from_account_id = rawObject.from_account_id;
        myMessage.to_account_id = rawObject.to_account_id;
        myMessage.create_time = rawObject.create_time;
        myMessage.read_time = rawObject.read_time;
        return myMessage;
    };
    Message_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Message_stub.table_name = "Message";
    Message_stub.__msg_id = "msg_id";
    Message_stub.__from_account_id = "from_account_id";
    Message_stub.__to_account_id = "to_account_id";
    Message_stub.__create_time = "create_time";
    Message_stub.__read_time = "read_time";
    return Message_stub;
})();
var Message = (function () {
    function Message() {
    }
    Message.table_name = "Message";
    return Message;
})();
//# sourceMappingURL=Message.js.map