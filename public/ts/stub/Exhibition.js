var Exhibition_stub = (function () {
    function Exhibition_stub() {
    }
    Exhibition_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Exhibition_stub.parseObject = function (rawObject) {
        //TODO
        var myExhibition = new Exhibition();
        myExhibition.event_id = rawObject.event_id;
        return myExhibition;
    };
    Exhibition_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Exhibition_stub.table_name = "Exhibition";
    Exhibition_stub.__event_id = "event_id";
    return Exhibition_stub;
})();
var Exhibition = (function () {
    function Exhibition() {
    }
    Exhibition.table_name = "Exhibition";
    return Exhibition;
})();
//# sourceMappingURL=Exhibition.js.map