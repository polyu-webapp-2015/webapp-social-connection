var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Account_stub = (function (_super) {
        __extends(Account_stub, _super);
        function Account_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Account_stub.prototype.tableName = function () {
            return "Account";
        };
        Account_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("account_id");
            list.push("password");
            list.push("account_type");
            list.push("email");
            list.push("phone_num");
            return list;
        };
        Account_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Account_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Account_stub.__account_id = "account_id";
        Account_stub.__password = "password";
        Account_stub.__account_type = "account_type";
        Account_stub.__email = "email";
        Account_stub.__phone_num = "phone_num";
        return Account_stub;
    })(stub.DataObject);
    stub.Account_stub = Account_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Account.js.map