///<reference path="ComplexDataObject.ts"/>
///<reference path="../User_stub.ts"/>
///<reference path="../Title_stub.ts"/>
///<reference path="../../lang.ts"/>
///<reference path="../../DataObjectManager.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
        Username.prototype.masterStubInstance = function () {
            return this._user_stub;
        };
        Username.prototype.masterDataObject = function () {
            return this.user;
        };
        Username.prototype.buildFromMasterDataObject = function (user, consumer) {
            var instance = new Username();
            instance.user = user;
            var titleFilter = function (title) {
                return title.get_title_id() == user.get_title_id();
            };
            var titleConsumer = function (titles) {
                if (titles.length == 0)
                    throw new stub.ComplexDataObjectMissingBaseStubError(instance, instance._title_stub);
                else {
                    instance.title = titles[0];
                    consumer(instance);
                }
            };
            DataObjectManager.request(this._title_stub, titleFilter, titleConsumer);
        };
        Username.prototype.getDisplayName = function () {
            return this.title.get_title_text()
                + ' ' + this.user.get_first_name()
                + ' ' + this.user.get_last_name();
        };
        Username.prototype.get_account_id = function () {
            return this.user.get_account_id();
        };
        return Username;
    })(stub.ComplexDataObject);
    stub.Username = Username;
    stub.add_stub_instance(new Username());
})(stub || (stub = {}));
//# sourceMappingURL=Username.js.map