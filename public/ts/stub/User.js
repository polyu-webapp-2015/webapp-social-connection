var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var User_stub = (function (_super) {
        __extends(User_stub, _super);
        function User_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        User_stub.prototype.tableName = function () {
            return "User";
        };
        User_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("account_id");
            list.push("sex");
            list.push("first_name");
            list.push("last_name");
            list.push("organization_id");
            list.push("title_id");
            list.push("city_id");
            list.push("last_announcement_datetime");
            return list;
        };
        User_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        User_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        User_stub.__account_id = "account_id";
        User_stub.__sex = "sex";
        User_stub.__first_name = "first_name";
        User_stub.__last_name = "last_name";
        User_stub.__organization_id = "organization_id";
        User_stub.__title_id = "title_id";
        User_stub.__city_id = "city_id";
        User_stub.__last_announcement_datetime = "last_announcement_datetime";
        return User_stub;
    })(stub.DataObject);
    stub.User_stub = User_stub;
})(stub || (stub = {}));
//# sourceMappingURL=User.js.map