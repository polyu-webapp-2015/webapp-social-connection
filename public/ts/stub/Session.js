var Session_stub = (function () {
    function Session_stub() {
    }
    Session_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Session_stub.parseObject = function (rawObject) {
        //TODO
        var mySession = new Session();
        mySession.event_id = rawObject.event_id;
        mySession.quota = rawObject.quota;
        return mySession;
    };
    Session_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Session_stub.table_name = "Session";
    Session_stub.__event_id = "event_id";
    Session_stub.__quota = "quota";
    return Session_stub;
})();
var Session = (function () {
    function Session() {
    }
    Session.table_name = "Session";
    return Session;
})();
//# sourceMappingURL=Session.js.map