var Tag_stub = (function () {
    function Tag_stub() {
    }
    Tag_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Tag_stub.parseObject = function (rawObject) {
        //TODO
        var myTag = new Tag();
        myTag.tag_id = rawObject.tag_id;
        myTag.tag_content = rawObject.tag_content;
        return myTag;
    };
    Tag_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Tag_stub.table_name = "Tag";
    Tag_stub.__tag_id = "tag_id";
    Tag_stub.__tag_content = "tag_content";
    return Tag_stub;
})();
var Tag = (function () {
    function Tag() {
    }
    Tag.table_name = "Tag";
    return Tag;
})();
//# sourceMappingURL=Tag.js.map