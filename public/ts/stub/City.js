var City_stub = (function () {
    function City_stub() {
    }
    City_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    City_stub.parseObject = function (rawObject) {
        //TODO
        var myCity = new City();
        myCity.city_id = rawObject.city_id;
        myCity.country_id = rawObject.country_id;
        myCity.city_name = rawObject.city_name;
        return myCity;
    };
    City_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    City_stub.table_name = "City";
    City_stub.__city_id = "city_id";
    City_stub.__country_id = "country_id";
    City_stub.__city_name = "city_name";
    return City_stub;
})();
var City = (function () {
    function City() {
    }
    City.table_name = "City";
    return City;
})();
//# sourceMappingURL=City.js.map