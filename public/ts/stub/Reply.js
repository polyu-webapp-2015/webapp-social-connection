var Reply_stub = (function () {
    function Reply_stub() {
    }
    Reply_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Reply_stub.parseObject = function (rawObject) {
        //TODO
        var myReply = new Reply();
        myReply.reply_id = rawObject.reply_id;
        myReply.post_Id = rawObject.post_Id;
        myReply.message = rawObject.message;
        return myReply;
    };
    Reply_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Reply_stub.table_name = "Reply";
    Reply_stub.__reply_id = "reply_id";
    Reply_stub.__post_Id = "post_Id";
    Reply_stub.__message = "message";
    return Reply_stub;
})();
var Reply = (function () {
    function Reply() {
    }
    Reply.table_name = "Reply";
    return Reply;
})();
//# sourceMappingURL=Reply.js.map