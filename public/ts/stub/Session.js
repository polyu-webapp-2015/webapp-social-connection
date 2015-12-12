var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Session_stub = (function (_super) {
        __extends(Session_stub, _super);
        function Session_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Session_stub.prototype.tableName = function () {
            return "Session";
        };
        Session_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            list.push("quota");
            return list;
        };
        Session_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Session_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Session_stub.__event_id = "event_id";
        Session_stub.__quota = "quota";
        return Session_stub;
    })(stub.DataObject);
    stub.Session_stub = Session_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Session.js.map