var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Title_stub = (function (_super) {
        __extends(Title_stub, _super);
        function Title_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Title_stub.__title_id = function () {
            return "title_id";
        };
        Title_stub.__title_text = function () {
            return "title_text";
        };
        /* implement DataObject */
        Title_stub.prototype.tableName = function () {
            return "Title";
        };
        Title_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("title_id");
            list.push("title_text");
            return list;
        };
        Title_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("title_id");
            list.push("title_text");
            return list;
        };
        Title_stub.prototype.parseObject = function (rawObject) {
            var instance = new Title_stub();
            if (rawObject.hasOwnProperty('title_id'))
                instance.title_id = rawObject.title_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('title_text'))
                instance.title_text = rawObject.title_text;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Title_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Title_stub.__title_id()] = instance.title_id;
            rawObject[Title_stub.__title_text()] = instance.title_text;
            return rawObject;
        };
        /* getter and setter */
        Title_stub.prototype.get_title_id = function () {
            return this.title_id * 1;
        };
        Title_stub.prototype.set_title_id = function (newValue) {
            if (this.isEditSupport()) {
                this.title_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Title_stub.prototype.get_title_text = function () {
            return this.title_text;
        };
        Title_stub.prototype.set_title_text = function (newValue) {
            if (this.isEditSupport()) {
                this.title_text = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Title_stub;
    })(stub.DataObject);
    stub.Title_stub = Title_stub;
    stub.add_stub_instance(new Title_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Title_stub.js.map