var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Friendship_stub = (function (_super) {
        __extends(Friendship_stub, _super);
        function Friendship_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Friendship_stub.__friendship_id = function () {
            return "friendship_id";
        };
        Friendship_stub.__host_id = function () {
            return "host_id";
        };
        Friendship_stub.__guest_id = function () {
            return "guest_id";
        };
        Friendship_stub.__remark = function () {
            return "remark";
        };
        /* implement DataObject */
        Friendship_stub.prototype.tableName = function () {
            return "Friendship";
        };
        Friendship_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("friendship_id");
            list.push("host_id");
            list.push("guest_id");
            return list;
        };
        Friendship_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("friendship_id");
            list.push("host_id");
            list.push("guest_id");
            list.push("remark");
            return list;
        };
        Friendship_stub.prototype.parseObject = function (rawObject) {
            var instance = new Friendship_stub();
            if (rawObject.hasOwnProperty('friendship_id'))
                instance.friendship_id = rawObject.friendship_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('host_id'))
                instance.host_id = rawObject.host_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('guest_id'))
                instance.guest_id = rawObject.guest_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('remark'))
                instance.remark = rawObject.remark;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Friendship_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Friendship_stub.__friendship_id()] = instance.friendship_id;
            rawObject[Friendship_stub.__host_id()] = instance.host_id;
            rawObject[Friendship_stub.__guest_id()] = instance.guest_id;
            rawObject[Friendship_stub.__remark()] = instance.remark;
            return rawObject;
        };
        /* getter and setter */
        Friendship_stub.prototype.get_friendship_id = function () {
            return this.friendship_id * 1;
        };
        Friendship_stub.prototype.set_friendship_id = function (newValue) {
            if (this.isEditSupport()) {
                this.friendship_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Friendship_stub.prototype.get_host_id = function () {
            return this.host_id * 1;
        };
        Friendship_stub.prototype.set_host_id = function (newValue) {
            if (this.isEditSupport()) {
                this.host_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Friendship_stub.prototype.get_guest_id = function () {
            return this.guest_id * 1;
        };
        Friendship_stub.prototype.set_guest_id = function (newValue) {
            if (this.isEditSupport()) {
                this.guest_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Friendship_stub.prototype.get_remark = function () {
            return this.remark;
        };
        Friendship_stub.prototype.set_remark = function (newValue) {
            if (this.isEditSupport()) {
                this.remark = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Friendship_stub;
    })(stub.DataObject);
    stub.Friendship_stub = Friendship_stub;
    stub.add_stub_instance(new Friendship_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Friendship_stub.js.map