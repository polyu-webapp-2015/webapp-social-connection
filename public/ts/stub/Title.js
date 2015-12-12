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
        Title_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Title_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Title_stub.__title_id = "title_id";
        Title_stub.__title_text = "title_text";
        return Title_stub;
    })(stub.DataObject);
    stub.Title_stub = Title_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Title.js.map