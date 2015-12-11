var Event_Attendee_stub = (function () {
    function Event_Attendee_stub() {
    }
    Event_Attendee_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Event_Attendee_stub.parseObject = function (rawObject) {
        //TODO
        var myEvent_Attendee = new Event_Attendee();
        myEvent_Attendee.event_id = rawObject.event_id;
        myEvent_Attendee.account_id = rawObject.account_id;
        return myEvent_Attendee;
    };
    Event_Attendee_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Event_Attendee_stub.table_name = "Event_Attendee";
    Event_Attendee_stub.__event_id = "event_id";
    Event_Attendee_stub.__account_id = "account_id";
    return Event_Attendee_stub;
})();
var Event_Attendee = (function () {
    function Event_Attendee() {
    }
    Event_Attendee.table_name = "Event_Attendee";
    return Event_Attendee;
})();
//# sourceMappingURL=Event_Attendee.js.map