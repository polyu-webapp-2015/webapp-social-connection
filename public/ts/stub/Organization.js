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
        /* implement DataObject */
        Organization_stub.prototype.tableName = function () {
            return "Organization";
        };
        Organization_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("organization_id");
            list.push("organization_type");
            list.push("name");
            list.push("main_country");
            return list;
        };
        Organization_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Organization_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Organization_stub.__organization_id = "organization_id";
        Organization_stub.__organization_type = "organization_type";
        Organization_stub.__name = "name";
        Organization_stub.__main_country = "main_country";
        return Organization_stub;
    })(stub.DataObject);
    stub.Organization_stub = Organization_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Organization.js.map