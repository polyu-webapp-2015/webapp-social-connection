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
        /* key */
        Tag_stub.__tag_id = function () {
            return "tag_id";
        };
        Tag_stub.__tag_content = function () {
            return "tag_content";
        };
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
            var instance = new Tag_stub();
            instance.tag_id = rawObject.tag_id;
            instance.tag_content = rawObject.tag_content;
            return instance;
        };
        Tag_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Tag_stub.__tag_id()] = instance.tag_id;
            rawObject[Tag_stub.__tag_content()] = instance.tag_content;
            return rawObject;
        };
        /* getter and setter */
        Tag_stub.prototype.get_tag_id = function () {
            return this.tag_id;
        };
        Tag_stub.prototype.set_tag_id = function (newValue) {
            if (this.isEditSupport()) {
                this.tag_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Tag_stub.prototype.get_tag_content = function () {
            return this.tag_content;
        };
        Tag_stub.prototype.set_tag_content = function (newValue) {
            if (this.isEditSupport()) {
                this.tag_content = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Tag_stub;
    })(stub.DataObject);
    stub.Tag_stub = Tag_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Tag_stub.js.map