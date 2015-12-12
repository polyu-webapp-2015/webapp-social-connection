var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Exhibition_stub = (function (_super) {
        __extends(Exhibition_stub, _super);
        function Exhibition_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Exhibition_stub.prototype.tableName = function () {
            return "Exhibition";
        };
        Exhibition_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Exhibition_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Exhibition_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Exhibition_stub.__event_id = "event_id";
        return Exhibition_stub;
    })(stub.DataObject);
    stub.Exhibition_stub = Exhibition_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Exhibition.js.map