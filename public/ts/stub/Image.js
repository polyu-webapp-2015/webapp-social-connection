var Image_stub = (function () {
    function Image_stub() {
    }
    Image_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Image_stub.parseObject = function (rawObject) {
        //TODO
        var myImage = new Image();
        myImage.image_id = rawObject.image_id;
        myImage.url = rawObject.url;
        return myImage;
    };
    Image_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Image_stub.table_name = "Image";
    Image_stub.__image_id = "image_id";
    Image_stub.__url = "url";
    return Image_stub;
})();
var Image = (function () {
    function Image() {
    }
    Image.table_name = "Image";
    return Image;
})();
//# sourceMappingURL=Image.js.map