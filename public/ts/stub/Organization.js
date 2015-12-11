var Organization_stub = (function () {
    function Organization_stub() {
    }
    Organization_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Organization_stub.parseObject = function (rawObject) {
        //TODO
        var myOrganization = new Organization();
        myOrganization.organization_id = rawObject.organization_id;
        myOrganization.organization_type = rawObject.organization_type;
        myOrganization.name = rawObject.name;
        myOrganization.main_country = rawObject.main_country;
        return myOrganization;
    };
    Organization_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Organization_stub.table_name = "Organization";
    Organization_stub.__organization_id = "organization_id";
    Organization_stub.__organization_type = "organization_type";
    Organization_stub.__name = "name";
    Organization_stub.__main_country = "main_country";
    return Organization_stub;
})();
var Organization = (function () {
    function Organization() {
    }
    Organization.table_name = "Organization";
    return Organization;
})();
//# sourceMappingURL=Organization.js.map