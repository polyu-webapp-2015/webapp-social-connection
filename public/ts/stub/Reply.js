var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Reply_stub = (function (_super) {
        __extends(Reply_stub, _super);
        function Reply_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Reply_stub.prototype.tableName = function () {
            return "Reply";
        };
        Reply_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("reply_id");
            list.push("post_Id");
            list.push("message");
            list.push("account_id");
            return list;
        };
        Reply_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Reply_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Reply_stub.__reply_id = "reply_id";
        Reply_stub.__post_Id = "post_Id";
        Reply_stub.__message = "message";
        Reply_stub.__account_id = "account_id";
        return Reply_stub;
    })(stub.DataObject);
    stub.Reply_stub = Reply_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Reply.js.map