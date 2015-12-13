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
        /* key */
        Account_stub.__account_id = function () {
            return "account_id";
        };
        Account_stub.__password = function () {
            return "password";
        };
        Account_stub.__account_type = function () {
            return "account_type";
        };
        Account_stub.__email = function () {
            return "email";
        };
        Account_stub.__phone_num = function () {
            return "phone_num";
        };
        /* implement DataObject */
        Account_stub.prototype.tableName = function () {
            return "Account";
        };
        Account_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("account_id");
            list.push("email");
            list.push("phone_num");
            return list;
        };
        Account_stub.prototype.parseObject = function (rawObject) {
            var instance = new Account_stub();
            instance.account_id = rawObject[Account_stub.__account_id()];
            instance.password = rawObject[Account_stub.__password()];
            instance.account_type = rawObject[Account_stub.__account_type()];
            instance.email = rawObject[Account_stub.__email()];
            instance.phone_num = rawObject[Account_stub.__phone_num()];
            return instance;
        };
        Account_stub.prototype.toObject = function (instant) {
            var rawObject = {};
            rawObject[Account_stub.__account_id()] = instant.account_id;
            rawObject[Account_stub.__password()] = instant.password;
            rawObject[Account_stub.__account_type()] = instant.account_type;
            rawObject[Account_stub.__email()] = instant.email;
            rawObject[Account_stub.__phone_num()] = instant.phone_num;
            return rawObject;
        };
        /* getter and setter */
        Account_stub.prototype.get_account_id = function () {
            return this.account_id;
        };
        Account_stub.prototype.set_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Account_stub.prototype.get_password = function () {
            return this.password;
        };
        Account_stub.prototype.set_password = function (newValue) {
            if (this.isEditSupport()) {
                this.password = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Account_stub.prototype.get_account_type = function () {
            return this.account_type;
        };
        Account_stub.prototype.set_account_type = function (newValue) {
            if (this.isEditSupport()) {
                this.account_type = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Account_stub.prototype.get_email = function () {
            return this.email;
        };
        Account_stub.prototype.set_email = function (newValue) {
            if (this.isEditSupport()) {
                this.email = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Account_stub.prototype.get_phone_num = function () {
            return this.phone_num;
        };
        Account_stub.prototype.set_phone_num = function (newValue) {
            if (this.isEditSupport()) {
                this.phone_num = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Account_stub;
    })(stub.DataObject);
    stub.Account_stub = Account_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Account_stub.js.map