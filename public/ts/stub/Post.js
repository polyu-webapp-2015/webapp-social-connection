var Post_stub = (function () {
    function Post_stub() {
    }
    Post_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Post_stub.parseObject = function (rawObject) {
        //TODO
        var myPost = new Post();
        myPost.post_Id = rawObject.post_Id;
        myPost.subject = rawObject.subject;
        myPost.description = rawObject.description;
        myPost.discussboard_id = rawObject.discussboard_id;
        return myPost;
    };
    Post_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Post_stub.table_name = "Post";
    Post_stub.__post_Id = "post_Id";
    Post_stub.__subject = "subject";
    Post_stub.__description = "description";
    Post_stub.__discussboard_id = "discussboard_id";
    return Post_stub;
})();
var Post = (function () {
    function Post() {
    }
    Post.table_name = "Post";
    return Post;
})();
//# sourceMappingURL=Post.js.map