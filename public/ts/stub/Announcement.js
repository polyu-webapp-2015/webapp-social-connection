var Announcement_stub = (function () {
    function Announcement_stub() {
    }
    Announcement_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Announcement_stub.parseObject = function (rawObject) {
        //TODO
        var myAnnouncement = new Announcement();
        myAnnouncement.announcement_id = rawObject.announcement_id;
        myAnnouncement.subject = rawObject.subject;
        myAnnouncement.description = rawObject.description;
        myAnnouncement.create_time = rawObject.create_time;
        return myAnnouncement;
    };
    Announcement_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Announcement_stub.table_name = "Announcement";
    Announcement_stub.__announcement_id = "announcement_id";
    Announcement_stub.__subject = "subject";
    Announcement_stub.__description = "description";
    Announcement_stub.__create_time = "create_time";
    return Announcement_stub;
})();
var Announcement = (function () {
    function Announcement() {
    }
    Announcement.table_name = "Announcement";
    return Announcement;
})();
//# sourceMappingURL=Announcement.js.map