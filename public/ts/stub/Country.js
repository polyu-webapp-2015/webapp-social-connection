var Country_stub = (function () {
    function Country_stub() {
    }
    Country_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Country_stub.parseObject = function (rawObject) {
        //TODO
        var myCountry = new Country();
        myCountry.country_id = rawObject.country_id;
        myCountry.country_name = rawObject.country_name;
        return myCountry;
    };
    Country_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Country_stub.table_name = "Country";
    Country_stub.__country_id = "country_id";
    Country_stub.__country_name = "country_name";
    return Country_stub;
})();
var Country = (function () {
    function Country() {
    }
    Country.table_name = "Country";
    return Country;
})();
//# sourceMappingURL=Country.js.map