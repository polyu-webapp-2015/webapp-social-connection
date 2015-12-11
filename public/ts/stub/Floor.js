var Floor_stub = (function () {
    function Floor_stub() {
    }
    Floor_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Floor_stub.parseObject = function (rawObject) {
        //TODO
        var myFloor = new Floor();
        myFloor.floor_id = rawObject.floor_id;
        myFloor.name = rawObject.name;
        return myFloor;
    };
    Floor_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Floor_stub.table_name = "Floor";
    Floor_stub.__floor_id = "floor_id";
    Floor_stub.__name = "name";
    return Floor_stub;
})();
var Floor = (function () {
    function Floor() {
    }
    Floor.table_name = "Floor";
    return Floor;
})();
//# sourceMappingURL=Floor.js.map