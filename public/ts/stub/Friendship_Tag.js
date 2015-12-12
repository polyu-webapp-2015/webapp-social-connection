var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Friendship_Tag_stub = (function (_super) {
        __extends(Friendship_Tag_stub, _super);
        function Friendship_Tag_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Friendship_Tag_stub.prototype.tableName = function () {
            return "Friendship_Tag";
        };
        Friendship_Tag_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("friendship_id");
            list.push("tag_id");
            return list;
        };
        Friendship_Tag_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Friendship_Tag_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Friendship_Tag_stub.__friendship_id = "friendship_id";
        Friendship_Tag_stub.__tag_id = "tag_id";
        return Friendship_Tag_stub;
    })(stub.DataObject);
    stub.Friendship_Tag_stub = Friendship_Tag_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Friendship_Tag.js.map