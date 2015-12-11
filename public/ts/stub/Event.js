var Event_stub = (function () {
    function Event_stub() {
    }
    Event_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Event_stub.parseObject = function (rawObject) {
        //TODO
        var myEvent = new Event();
        myEvent.event_id = rawObject.event_id;
        myEvent.create_time = rawObject.create_time;
        myEvent.edit_time = rawObject.edit_time;
        myEvent.event_type = rawObject.event_type;
        myEvent.venue_id = rawObject.venue_id;
        myEvent.event_time = rawObject.event_time;
        myEvent.creator_account_id = rawObject.creator_account_id;
        myEvent.editor_account_id = rawObject.editor_account_id;
        myEvent.subject = rawObject.subject;
        myEvent.description = rawObject.description;
        return myEvent;
    };
    Event_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Event_stub.table_name = "Event";
    Event_stub.__event_id = "event_id";
    Event_stub.__create_time = "create_time";
    Event_stub.__edit_time = "edit_time";
    Event_stub.__event_type = "event_type";
    Event_stub.__venue_id = "venue_id";
    Event_stub.__event_time = "event_time";
    Event_stub.__creator_account_id = "creator_account_id";
    Event_stub.__editor_account_id = "editor_account_id";
    Event_stub.__subject = "subject";
    Event_stub.__description = "description";
    return Event_stub;
})();
var Event = (function () {
    function Event() {
    }
    Event.table_name = "Event";
    return Event;
})();
//# sourceMappingURL=Event.js.map