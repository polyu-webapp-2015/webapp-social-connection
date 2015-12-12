var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Post_stub = (function (_super) {
        __extends(Post_stub, _super);
        function Post_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Post_stub.prototype.tableName = function () {
            return "Post";
        };
        Post_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("post_Id");
            list.push("subject");
            list.push("description");
            list.push("discussboard_id");
            return list;
        };
        Post_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Post_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Post_stub.__post_Id = "post_Id";
        Post_stub.__subject = "subject";
        Post_stub.__description = "description";
        Post_stub.__discussboard_id = "discussboard_id";
        return Post_stub;
    })(stub.DataObject);
    stub.Post_stub = Post_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Post.js.map