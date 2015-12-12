var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Announcement_stub = (function (_super) {
        __extends(Announcement_stub, _super);
        function Announcement_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Announcement_stub.prototype.tableName = function () {
            return "Announcement";
        };
        Announcement_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("announcement_id");
            list.push("subject");
            list.push("description");
            list.push("create_time");
            return list;
        };
        Announcement_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Announcement_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Announcement_stub.__announcement_id = "announcement_id";
        Announcement_stub.__subject = "subject";
        Announcement_stub.__description = "description";
        Announcement_stub.__create_time = "create_time";
        return Announcement_stub;
    })(stub.DataObject);
    stub.Announcement_stub = Announcement_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Announcement.js.map