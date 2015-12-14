var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var DiscussBoard_stub = (function (_super) {
        __extends(DiscussBoard_stub, _super);
        function DiscussBoard_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        DiscussBoard_stub.__discussboard_id = function () {
            return "discussboard_id";
        };
        DiscussBoard_stub.__subject = function () {
            return "subject";
        };
        DiscussBoard_stub.__description = function () {
            return "description";
        };
        /* implement DataObject */
        DiscussBoard_stub.prototype.tableName = function () {
            return "DiscussBoard";
        };
        DiscussBoard_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("discussboard_id");
            return list;
        };
        DiscussBoard_stub.prototype.parseObject = function (rawObject) {
            var instance = new DiscussBoard_stub();
            instance.discussboard_id = rawObject.discussboard_id;
            instance.subject = rawObject.subject;
            instance.description = rawObject.description;
            return instance;
        };
        DiscussBoard_stub.prototype.toObject = function (instance) {
            if (instance == null)
                instance = this;
            var rawObject = {};
            rawObject[DiscussBoard_stub.__discussboard_id()] = instance.discussboard_id;
            rawObject[DiscussBoard_stub.__subject()] = instance.subject;
            rawObject[DiscussBoard_stub.__description()] = instance.description;
            return rawObject;
        };
        /* getter and setter */
        DiscussBoard_stub.prototype.get_discussboard_id = function () {
            return this.discussboard_id;
        };
        DiscussBoard_stub.prototype.set_discussboard_id = function (newValue) {
            if (this.isEditSupport()) {
                this.discussboard_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_subject = function () {
            return this.subject;
        };
        DiscussBoard_stub.prototype.set_subject = function (newValue) {
            if (this.isEditSupport()) {
                this.subject = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        DiscussBoard_stub.prototype.get_description = function () {
            return this.description;
        };
        DiscussBoard_stub.prototype.set_description = function (newValue) {
            if (this.isEditSupport()) {
                this.description = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return DiscussBoard_stub;
    })(stub.DataObject);
    stub.DiscussBoard_stub = DiscussBoard_stub;
})(stub || (stub = {}));
//# sourceMappingURL=DiscussBoard_stub.js.map