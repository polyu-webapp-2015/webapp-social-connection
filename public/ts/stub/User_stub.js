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
        /* key */
        User_stub.__account_id = function () {
            return "account_id";
        };
        User_stub.__sex = function () {
            return "sex";
        };
        User_stub.__first_name = function () {
            return "first_name";
        };
        User_stub.__last_name = function () {
            return "last_name";
        };
        User_stub.__organization_id = function () {
            return "organization_id";
        };
        User_stub.__title_id = function () {
            return "title_id";
        };
        User_stub.__city_id = function () {
            return "city_id";
        };
        User_stub.__last_announcement_datetime = function () {
            return "last_announcement_datetime";
        };
        /* implement DataObject */
        User_stub.prototype.tableName = function () {
            return "User";
        };
        User_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("account_id");
            return list;
        };
        User_stub.prototype.allKeyList = function () {
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
            var instance = new User_stub();
            if (rawObject.hasOwnProperty('account_id'))
                instance.account_id = rawObject.account_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('sex'))
                instance.sex = rawObject.sex;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('first_name'))
                instance.first_name = rawObject.first_name;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('last_name'))
                instance.last_name = rawObject.last_name;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('organization_id'))
                instance.organization_id = rawObject.organization_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('title_id'))
                instance.title_id = rawObject.title_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('city_id'))
                instance.city_id = rawObject.city_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('last_announcement_datetime'))
                instance.last_announcement_datetime = rawObject.last_announcement_datetime;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        User_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[User_stub.__account_id()] = instance.account_id;
            rawObject[User_stub.__sex()] = instance.sex;
            rawObject[User_stub.__first_name()] = instance.first_name;
            rawObject[User_stub.__last_name()] = instance.last_name;
            rawObject[User_stub.__organization_id()] = instance.organization_id;
            rawObject[User_stub.__title_id()] = instance.title_id;
            rawObject[User_stub.__city_id()] = instance.city_id;
            rawObject[User_stub.__last_announcement_datetime()] = instance.last_announcement_datetime;
            return rawObject;
        };
        /* getter and setter */
        User_stub.prototype.get_account_id = function () {
            return this.account_id * 1;
        };
        User_stub.prototype.set_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_sex = function () {
            return this.sex;
        };
        User_stub.prototype.set_sex = function (newValue) {
            if (this.isEditSupport()) {
                this.sex = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_first_name = function () {
            return this.first_name;
        };
        User_stub.prototype.set_first_name = function (newValue) {
            if (this.isEditSupport()) {
                this.first_name = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_last_name = function () {
            return this.last_name;
        };
        User_stub.prototype.set_last_name = function (newValue) {
            if (this.isEditSupport()) {
                this.last_name = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_organization_id = function () {
            return this.organization_id * 1;
        };
        User_stub.prototype.set_organization_id = function (newValue) {
            if (this.isEditSupport()) {
                this.organization_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_title_id = function () {
            return this.title_id * 1;
        };
        User_stub.prototype.set_title_id = function (newValue) {
            if (this.isEditSupport()) {
                this.title_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_city_id = function () {
            return this.city_id * 1;
        };
        User_stub.prototype.set_city_id = function (newValue) {
            if (this.isEditSupport()) {
                this.city_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        User_stub.prototype.get_last_announcement_datetime = function () {
            return this.last_announcement_datetime;
        };
        User_stub.prototype.set_last_announcement_datetime = function (newValue) {
            if (this.isEditSupport()) {
                this.last_announcement_datetime = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return User_stub;
    })(stub.DataObject);
    stub.User_stub = User_stub;
    stub.add_stub_instance(new User_stub());
})(stub || (stub = {}));
//# sourceMappingURL=User_stub.js.map