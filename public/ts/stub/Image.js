var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Image_stub = (function (_super) {
        __extends(Image_stub, _super);
        function Image_stub() {
            _super.apply(this, arguments);
        }
        /* implement DataObject */
        Image_stub.prototype.tableName = function () {
            return "Image";
        };
        Image_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("image_id");
            list.push("url");
            return list;
        };
        Image_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Image_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* key */
        Image_stub.__image_id = "image_id";
        Image_stub.__url = "url";
        return Image_stub;
    })(stub.DataObject);
    stub.Image_stub = Image_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Image.js.map