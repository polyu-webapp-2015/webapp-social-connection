var Title_stub = (function () {
    function Title_stub() {
    }
    Title_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Title_stub.parseObject = function (rawObject) {
        //TODO
        var myTitle = new Title();
        myTitle.title_id = rawObject.title_id;
        myTitle.title_text = rawObject.title_text;
        return myTitle;
    };
    Title_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Title_stub.table_name = "Title";
    Title_stub.__title_id = "title_id";
    Title_stub.__title_text = "title_text";
    return Title_stub;
})();
var Title = (function () {
    function Title() {
    }
    Title.table_name = "Title";
    return Title;
})();
//# sourceMappingURL=Title.js.map