var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Organization_stub = (function (_super) {
        __extends(Organization_stub, _super);
        function Organization_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Organization_stub.__organization_id = function () {
            return "organization_id";
        };
        Organization_stub.__organization_type = function () {
            return "organization_type";
        };
        Organization_stub.__name = function () {
            return "name";
        };
        Organization_stub.__main_country = function () {
            return "main_country";
        };
        /* implement DataObject */
        Organization_stub.prototype.tableName = function () {
            return "Organization";
        };
        Organization_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("organization_id");
            return list;
        };
        Organization_stub.prototype.parseObject = function (rawObject) {
            var instance = new Organization_stub();
            if (rawObject.hasOwnProperty('organization_id'))
                instance.organization_id = rawObject.organization_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('organization_type'))
                instance.organization_type = rawObject.organization_type;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('name'))
                instance.name = rawObject.name;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('main_country'))
                instance.main_country = rawObject.main_country;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Organization_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Organization_stub.__organization_id()] = instance.organization_id;
            rawObject[Organization_stub.__organization_type()] = instance.organization_type;
            rawObject[Organization_stub.__name()] = instance.name;
            rawObject[Organization_stub.__main_country()] = instance.main_country;
            return rawObject;
        };
        /* getter and setter */
        Organization_stub.prototype.get_organization_id = function () {
            return this.organization_id;
        };
        Organization_stub.prototype.set_organization_id = function (newValue) {
            if (this.isEditSupport()) {
                this.organization_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Organization_stub.prototype.get_organization_type = function () {
            return this.organization_type;
        };
        Organization_stub.prototype.set_organization_type = function (newValue) {
            if (this.isEditSupport()) {
                this.organization_type = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Organization_stub.prototype.get_name = function () {
            return this.name;
        };
        Organization_stub.prototype.set_name = function (newValue) {
            if (this.isEditSupport()) {
                this.name = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Organization_stub.prototype.get_main_country = function () {
            return this.main_country;
        };
        Organization_stub.prototype.set_main_country = function (newValue) {
            if (this.isEditSupport()) {
                this.main_country = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Organization_stub;
    })(stub.DataObject);
    stub.Organization_stub = Organization_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Organization_stub.js.map