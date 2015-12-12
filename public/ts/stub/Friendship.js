var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Friendship_stub = (function (_super) {
        __extends(Friendship_stub, _super);
        function Friendship_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Friendship_stub.prototype.tableName = function () {
            return "Friendship";
        };
        Friendship_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("friendship_id");
            list.push("host_id");
            list.push("guest_id");
            list.push("remark");
            return list;
        };
        Friendship_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Friendship_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Friendship_stub.__friendship_id = "friendship_id";
        Friendship_stub.__host_id = "host_id";
        Friendship_stub.__guest_id = "guest_id";
        Friendship_stub.__remark = "remark";
        return Friendship_stub;
    })(stub.DataObject);
    stub.Friendship_stub = Friendship_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Friendship.js.map