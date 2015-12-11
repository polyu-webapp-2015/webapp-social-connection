var DiscussBoard_stub = (function () {
    function DiscussBoard_stub() {
    }
    DiscussBoard_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    DiscussBoard_stub.parseObject = function (rawObject) {
        //TODO
        var myDiscussBoard = new DiscussBoard();
        myDiscussBoard.discussboard_id = rawObject.discussboard_id;
        myDiscussBoard.subject = rawObject.subject;
        myDiscussBoard.description = rawObject.description;
        return myDiscussBoard;
    };
    DiscussBoard_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    DiscussBoard_stub.table_name = "DiscussBoard";
    DiscussBoard_stub.__discussboard_id = "discussboard_id";
    DiscussBoard_stub.__subject = "subject";
    DiscussBoard_stub.__description = "description";
    return DiscussBoard_stub;
})();
var DiscussBoard = (function () {
    function DiscussBoard() {
    }
    DiscussBoard.table_name = "DiscussBoard";
    return DiscussBoard;
})();
//# sourceMappingURL=DiscussBoard.js.map