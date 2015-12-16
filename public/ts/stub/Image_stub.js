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
        /* key */
        Image_stub.__image_id = function () {
            return "image_id";
        };
        Image_stub.__url = function () {
            return "url";
        };
        /* implement DataObject */
        Image_stub.prototype.tableName = function () {
            return "Image";
        };
        Image_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("image_id");
            return list;
        };
        Image_stub.prototype.parseObject = function (rawObject) {
            var instance = new Image_stub();
            instance.image_id = rawObject.image_id;
            instance.url = rawObject.url;
            return instance;
        };
        Image_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Image_stub.__image_id()] = instance.image_id;
            rawObject[Image_stub.__url()] = instance.url;
            return rawObject;
        };
        /* getter and setter */
        Image_stub.prototype.get_image_id = function () {
            return this.image_id;
        };
        Image_stub.prototype.set_image_id = function (newValue) {
            if (this.isEditSupport()) {
                this.image_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Image_stub.prototype.get_url = function () {
            return this.url;
        };
        Image_stub.prototype.set_url = function (newValue) {
            if (this.isEditSupport()) {
                this.url = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Image_stub;
    })(stub.DataObject);
    stub.Image_stub = Image_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Image_stub.js.map