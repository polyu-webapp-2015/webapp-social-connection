var Friendship_stub = (function () {
    function Friendship_stub() {
    }
    Friendship_stub.getObject = function ($http) {
        get_all_row($http, this.table_name);
    };
    Friendship_stub.parseObject = function (rawObject) {
        //TODO
        var myFriendship = new Friendship();
        myFriendship.friendship_id = rawObject.friendship_id;
        myFriendship.host_id = rawObject.host_id;
        myFriendship.guest_id = rawObject.guest_id;
        myFriendship.remark = rawObject.remark;
        return myFriendship;
    };
    Friendship_stub.get_all_instance = function ($http) {
        var _this = this;
        var all_row = get_all_row($http, this.table_name);
        return all_row.map(function (row) { return _this.parseObject(row); });
    };
    Friendship_stub.table_name = "Friendship";
    Friendship_stub.__friendship_id = "friendship_id";
    Friendship_stub.__host_id = "host_id";
    Friendship_stub.__guest_id = "guest_id";
    Friendship_stub.__remark = "remark";
    return Friendship_stub;
})();
var Friendship = (function () {
    function Friendship() {
    }
    Friendship.table_name = "Friendship";
    return Friendship;
})();
//# sourceMappingURL=Friendship.js.map