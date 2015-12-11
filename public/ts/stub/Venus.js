var Venus_stub = (function () {
    function Venus_stub() {
    }
    Venus_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Venus_stub.parseObject = function (rawObject) {
        //TODO
        var myVenus = new Venus();
        myVenus.venue_id = rawObject.venue_id;
        myVenus.floor_id = rawObject.floor_id;
        return myVenus;
    };
    Venus_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Venus_stub.table_name = "Venus";
    Venus_stub.__venue_id = "venue_id";
    Venus_stub.__floor_id = "floor_id";
    return Venus_stub;
})();
var Venus = (function () {
    function Venus() {
    }
    Venus.table_name = "Venus";
    return Venus;
})();
//# sourceMappingURL=Venus.js.map