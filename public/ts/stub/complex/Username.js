var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="ComplexDataObject.ts"/>
///<reference path="../User_stub.ts"/>
///<reference path="../Title_stub.ts"/>
var stub;
(function (stub) {
    var Username = (function (_super) {
        __extends(Username, _super);
        function Username() {
            _super.apply(this, arguments);
            this._user_stub = new stub.User_stub();
            this._title_stub = new stub.Title_stub();
        }
        Username.prototype.tableName = function () {
            return "Username";
        };
        Username.prototype.baseInstances = function () {
            var list = [];
            list.push(this._user_stub);
            list.push(this._title_stub);
            return list;
        };
        Username.prototype.parseBaseObjects = function (rawObjects) {
            var instance = new Username();
            instance.user = this.parseTargetBaseObject(rawObjects, this._user_stub);
            instance.title = this.parseTargetBaseObject(rawObjects, this._title_stub);
            return instance;
        };
        Username.prototype.toBaseObjects = function () {
            var user = this.user.toObject();
            var title = this.title.toObject();
            return [user, title];
        };
        Username.prototype.getDisplayName = function () {
            return this.title.get_title_text()
                + ' ' + this.user.get_first_name()
                + ' ' + this.user.get_last_name();
        };
        return Username;
    })(stub.ComplexDataObject);
    stub.Username = Username;
})(stub || (stub = {}));
//# sourceMappingURL=Username.js.map