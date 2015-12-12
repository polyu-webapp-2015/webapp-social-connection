var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var DiscussBoard_stub = (function (_super) {
        __extends(DiscussBoard_stub, _super);
        function DiscussBoard_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        DiscussBoard_stub.prototype.tableName = function () {
            return "DiscussBoard";
        };
        DiscussBoard_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("discussboard_id");
            list.push("subject");
            list.push("description");
            return list;
        };
        DiscussBoard_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        DiscussBoard_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        DiscussBoard_stub.__discussboard_id = "discussboard_id";
        DiscussBoard_stub.__subject = "subject";
        DiscussBoard_stub.__description = "description";
        return DiscussBoard_stub;
    })(stub.DataObject);
    stub.DiscussBoard_stub = DiscussBoard_stub;
})(stub || (stub = {}));
//# sourceMappingURL=DiscussBoard.js.map