var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Tag_stub = (function (_super) {
        __extends(Tag_stub, _super);
        function Tag_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Tag_stub.prototype.tableName = function () {
            return "Tag";
        };
        Tag_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("tag_id");
            list.push("tag_content");
            return list;
        };
        Tag_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Tag_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Tag_stub.__tag_id = "tag_id";
        Tag_stub.__tag_content = "tag_content";
        return Tag_stub;
    })(stub.DataObject);
    stub.Tag_stub = Tag_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Tag.js.map