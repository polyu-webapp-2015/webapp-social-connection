var Event_Organization_stub = (function () {
    function Event_Organization_stub() {
    }
    Event_Organization_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Event_Organization_stub.parseObject = function (rawObject) {
        //TODO
        var myEvent_Organization = new Event_Organization();
        myEvent_Organization.event_id = rawObject.event_id;
        myEvent_Organization.organization_id = rawObject.organization_id;
        return myEvent_Organization;
    };
    Event_Organization_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Event_Organization_stub.table_name = "Event_Organization";
    Event_Organization_stub.__event_id = "event_id";
    Event_Organization_stub.__organization_id = "organization_id";
    return Event_Organization_stub;
})();
var Event_Organization = (function () {
    function Event_Organization() {
    }
    Event_Organization.table_name = "Event_Organization";
    return Event_Organization;
})();
//# sourceMappingURL=Event_Organization.js.map