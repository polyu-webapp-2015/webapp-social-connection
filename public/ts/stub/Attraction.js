var Attraction_stub = (function () {
    function Attraction_stub() {
    }
    Attraction_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Attraction_stub.parseObject = function (rawObject) {
        //TODO
        var myAttraction = new Attraction();
        myAttraction.event_id = rawObject.event_id;
        return myAttraction;
    };
    Attraction_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Attraction_stub.table_name = "Attraction";
    Attraction_stub.__event_id = "event_id";
    return Attraction_stub;
})();
var Attraction = (function () {
    function Attraction() {
    }
    Attraction.table_name = "Attraction";
    return Attraction;
})();
//# sourceMappingURL=Attraction.js.map