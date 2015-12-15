var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="ComplexDataObject.ts"/>
var stub;
(function (stub) {
    var Username = (function (_super) {
        __extends(Username, _super);
        function Username() {
            _super.apply(this, arguments);
        }
        Username.prototype.tableName = function () {
            return "Username";
        };
        Username.prototype.isEditSupport = function () {
            return this.uniqueKeyList().length > 0;
        };
        return Username;
    })(stub.DataObject);
    stub.Username = Username;
})(stub || (stub = {}));
//# sourceMappingURL=Username.js.map