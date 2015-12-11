var Account_stub = (function () {
    function Account_stub() {
    }
    Account_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Account_stub.parseObject = function (rawObject) {
        //TODO
        var myAccount = new Account();
        myAccount.account_id = rawObject.account_id;
        myAccount.password = rawObject.password;
        myAccount.account_type = rawObject.account_type;
        myAccount.email = rawObject.email;
        myAccount.phone_num = rawObject.phone_num;
        return myAccount;
    };
    Account_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Account_stub.table_name = "Account";
    Account_stub.__account_id = "account_id";
    Account_stub.__password = "password";
    Account_stub.__account_type = "account_type";
    Account_stub.__email = "email";
    Account_stub.__phone_num = "phone_num";
    return Account_stub;
})();
var Account = (function () {
    function Account() {
    }
    Account.table_name = "Account";
    return Account;
})();
//# sourceMappingURL=Account.js.map