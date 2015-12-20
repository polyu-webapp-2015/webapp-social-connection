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
        /* key */
        Friendship_Tag_stub.__friendship_id1 = function () {
            return "friendship_id1";
        };
        Friendship_Tag_stub.__friendship_id2 = function () {
            return "friendship_id2";
        };
        Friendship_Tag_stub.__tag_id = function () {
            return "tag_id";
        };
        /* implement DataObject */
        Friendship_Tag_stub.prototype.tableName = function () {
            return "Friendship_Tag";
        };
        Friendship_Tag_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("friendship_id1");
            list.push("friendship_id2");
            return list;
        };
        Friendship_Tag_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("friendship_id1");
            list.push("friendship_id2");
            list.push("tag_id");
            return list;
        };
        Friendship_Tag_stub.prototype.parseObject = function (rawObject) {
            var instance = new Friendship_Tag_stub();
            if (rawObject.hasOwnProperty('friendship_id1'))
                instance.friendship_id1 = rawObject.friendship_id1;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('friendship_id2'))
                instance.friendship_id2 = rawObject.friendship_id2;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('tag_id'))
                instance.tag_id = rawObject.tag_id;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Friendship_Tag_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Friendship_Tag_stub.__friendship_id1()] = instance.friendship_id1;
            rawObject[Friendship_Tag_stub.__friendship_id2()] = instance.friendship_id2;
            rawObject[Friendship_Tag_stub.__tag_id()] = instance.tag_id;
            return rawObject;
        };
        /* getter and setter */
        Friendship_Tag_stub.prototype.get_friendship_id1 = function () {
            return this.friendship_id1 * 1;
        };
        Friendship_Tag_stub.prototype.set_friendship_id1 = function (newValue) {
            if (this.isEditSupport()) {
                this.friendship_id1 = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Friendship_Tag_stub.prototype.get_friendship_id2 = function () {
            return this.friendship_id2 * 1;
        };
        Friendship_Tag_stub.prototype.set_friendship_id2 = function (newValue) {
            if (this.isEditSupport()) {
                this.friendship_id2 = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Friendship_Tag_stub.prototype.get_tag_id = function () {
            return this.tag_id * 1;
        };
        Friendship_Tag_stub.prototype.set_tag_id = function (newValue) {
            if (this.isEditSupport()) {
                this.tag_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Friendship_Tag_stub;
    })(stub.DataObject);
    stub.Friendship_Tag_stub = Friendship_Tag_stub;
    stub.add_stub_instance(new Friendship_Tag_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Friendship_Tag_stub.js.map