var Friendship_Tag_stub = (function () {
    function Friendship_Tag_stub() {
    }
    Friendship_Tag_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Friendship_Tag_stub.parseObject = function (rawObject) {
        //TODO
        var myFriendship_Tag = new Friendship_Tag();
        myFriendship_Tag.friendship_id = rawObject.friendship_id;
        myFriendship_Tag.tag_id = rawObject.tag_id;
        return myFriendship_Tag;
    };
    Friendship_Tag_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Friendship_Tag_stub.table_name = "Friendship_Tag";
    Friendship_Tag_stub.__friendship_id = "friendship_id";
    Friendship_Tag_stub.__tag_id = "tag_id";
    return Friendship_Tag_stub;
})();
var Friendship_Tag = (function () {
    function Friendship_Tag() {
    }
    Friendship_Tag.table_name = "Friendship_Tag";
    return Friendship_Tag;
})();
//# sourceMappingURL=Friendship_Tag.js.map