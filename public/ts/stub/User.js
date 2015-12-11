var User_stub = (function () {
    function User_stub() {
    }
    User_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    User_stub.parseObject = function (rawObject) {
        //TODO
        var myUser = new User();
        myUser.account_id = rawObject.account_id;
        myUser.sex = rawObject.sex;
        myUser.first_name = rawObject.first_name;
        myUser.last_name = rawObject.last_name;
        myUser.organization_id = rawObject.organization_id;
        myUser.title_id = rawObject.title_id;
        myUser.city_id = rawObject.city_id;
        myUser.last_announcement_datetime = rawObject.last_announcement_datetime;
        return myUser;
    };
    User_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    User_stub.table_name = "User";
    User_stub.__account_id = "account_id";
    User_stub.__sex = "sex";
    User_stub.__first_name = "first_name";
    User_stub.__last_name = "last_name";
    User_stub.__organization_id = "organization_id";
    User_stub.__title_id = "title_id";
    User_stub.__city_id = "city_id";
    User_stub.__last_announcement_datetime = "last_announcement_datetime";
    return User_stub;
})();
var User = (function () {
    function User() {
    }
    User.table_name = "User";
    return User;
})();
//# sourceMappingURL=User.js.map