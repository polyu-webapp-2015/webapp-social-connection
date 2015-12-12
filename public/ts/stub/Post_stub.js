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
        /* key */
        Post_stub.__post_Id = function () {
            return "post_Id";
        };
        Post_stub.__subject = function () {
            return "subject";
        };
        Post_stub.__description = function () {
            return "description";
        };
        Post_stub.__discussboard_id = function () {
            return "discussboard_id";
        };
        /* implement DataObject */
        Post_stub.prototype.tableName = function () {
            return "Post";
        };
        Post_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("post_Id");
            return list;
        };
        Post_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Post_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* getter and setter */
        Post_stub.prototype.get_post_Id = function () {
            return this.post_Id;
        };
        Post_stub.prototype.set_post_Id = function (newValue) {
            if (this.isEditSupport()) {
                this.post_Id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_subject = function () {
            return this.subject;
        };
        Post_stub.prototype.set_subject = function (newValue) {
            if (this.isEditSupport()) {
                this.subject = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_description = function () {
            return this.description;
        };
        Post_stub.prototype.set_description = function (newValue) {
            if (this.isEditSupport()) {
                this.description = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Post_stub.prototype.get_discussboard_id = function () {
            return this.discussboard_id;
        };
        Post_stub.prototype.set_discussboard_id = function (newValue) {
            if (this.isEditSupport()) {
                this.discussboard_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Post_stub;
    })(stub.DataObject);
    stub.Post_stub = Post_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Post_stub.js.map