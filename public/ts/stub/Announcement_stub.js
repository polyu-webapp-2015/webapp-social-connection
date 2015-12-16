var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Announcement_stub = (function (_super) {
        __extends(Announcement_stub, _super);
        function Announcement_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Announcement_stub.__announcement_id = function () {
            return "announcement_id";
        };
        Announcement_stub.__subject = function () {
            return "subject";
        };
        Announcement_stub.__description = function () {
            return "description";
        };
        Announcement_stub.__create_time = function () {
            return "create_time";
        };
        Announcement_stub.__creator_account_id = function () {
            return "creator_account_id";
        };
        /* implement DataObject */
        Announcement_stub.prototype.tableName = function () {
            return "Announcement";
        };
        Announcement_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("announcement_id");
            return list;
        };
        Announcement_stub.prototype.parseObject = function (rawObject) {
            var instance = new Announcement_stub();
            instance.announcement_id = rawObject.announcement_id;
            instance.subject = rawObject.subject;
            instance.description = rawObject.description;
            instance.create_time = rawObject.create_time;
            instance.creator_account_id = rawObject.creator_account_id;
            return instance;
        };
        Announcement_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Announcement_stub.__announcement_id()] = instance.announcement_id;
            rawObject[Announcement_stub.__subject()] = instance.subject;
            rawObject[Announcement_stub.__description()] = instance.description;
            rawObject[Announcement_stub.__create_time()] = instance.create_time;
            rawObject[Announcement_stub.__creator_account_id()] = instance.creator_account_id;
            return rawObject;
        };
        /* getter and setter */
        Announcement_stub.prototype.get_announcement_id = function () {
            return this.announcement_id;
        };
        Announcement_stub.prototype.set_announcement_id = function (newValue) {
            if (this.isEditSupport()) {
                this.announcement_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Announcement_stub.prototype.get_subject = function () {
            return this.subject;
        };
        Announcement_stub.prototype.set_subject = function (newValue) {
            if (this.isEditSupport()) {
                this.subject = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Announcement_stub.prototype.get_description = function () {
            return this.description;
        };
        Announcement_stub.prototype.set_description = function (newValue) {
            if (this.isEditSupport()) {
                this.description = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Announcement_stub.prototype.get_create_time = function () {
            return this.create_time;
        };
        Announcement_stub.prototype.set_create_time = function (newValue) {
            if (this.isEditSupport()) {
                this.create_time = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Announcement_stub.prototype.get_creator_account_id = function () {
            return this.creator_account_id;
        };
        Announcement_stub.prototype.set_creator_account_id = function (newValue) {
            if (this.isEditSupport()) {
                this.creator_account_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Announcement_stub;
    })(stub.DataObject);
    stub.Announcement_stub = Announcement_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Announcement_stub.js.map