var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Reward_stub = (function (_super) {
        __extends(Reward_stub, _super);
        function Reward_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Reward_stub.__reward_id = function () {
            return "reward_id";
        };
        Reward_stub.__reward_type = function () {
            return "reward_type";
        };
        Reward_stub.__amount = function () {
            return "amount";
        };
        Reward_stub.__collection_venue = function () {
            return "collection_venue";
        };
        Reward_stub.__status = function () {
            return "status";
        };
        Reward_stub.__receiver_id = function () {
            return "receiver_id";
        };
        Reward_stub.__sender_id = function () {
            return "sender_id";
        };
        /* implement DataObject */
        Reward_stub.prototype.tableName = function () {
            return "Reward";
        };
        Reward_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("reward_id");
            return list;
        };
        Reward_stub.prototype.parseObject = function (rawObject) {
            var instance = new Reward_stub();
            if (rawObject.hasOwnProperty('reward_id'))
                instance.reward_id = rawObject.reward_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('reward_type'))
                instance.reward_type = rawObject.reward_type;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('amount'))
                instance.amount = rawObject.amount;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('collection_venue'))
                instance.collection_venue = rawObject.collection_venue;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('status'))
                instance.status = rawObject.status;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('receiver_id'))
                instance.receiver_id = rawObject.receiver_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('sender_id'))
                instance.sender_id = rawObject.sender_id;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Reward_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Reward_stub.__reward_id()] = instance.reward_id;
            rawObject[Reward_stub.__reward_type()] = instance.reward_type;
            rawObject[Reward_stub.__amount()] = instance.amount;
            rawObject[Reward_stub.__collection_venue()] = instance.collection_venue;
            rawObject[Reward_stub.__status()] = instance.status;
            rawObject[Reward_stub.__receiver_id()] = instance.receiver_id;
            rawObject[Reward_stub.__sender_id()] = instance.sender_id;
            return rawObject;
        };
        /* getter and setter */
        Reward_stub.prototype.get_reward_id = function () {
            return this.reward_id;
        };
        Reward_stub.prototype.set_reward_id = function (newValue) {
            if (this.isEditSupport()) {
                this.reward_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reward_stub.prototype.get_reward_type = function () {
            return this.reward_type;
        };
        Reward_stub.prototype.set_reward_type = function (newValue) {
            if (this.isEditSupport()) {
                this.reward_type = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reward_stub.prototype.get_amount = function () {
            return this.amount;
        };
        Reward_stub.prototype.set_amount = function (newValue) {
            if (this.isEditSupport()) {
                this.amount = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reward_stub.prototype.get_collection_venue = function () {
            return this.collection_venue;
        };
        Reward_stub.prototype.set_collection_venue = function (newValue) {
            if (this.isEditSupport()) {
                this.collection_venue = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reward_stub.prototype.get_status = function () {
            return this.status;
        };
        Reward_stub.prototype.set_status = function (newValue) {
            if (this.isEditSupport()) {
                this.status = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reward_stub.prototype.get_receiver_id = function () {
            return this.receiver_id;
        };
        Reward_stub.prototype.set_receiver_id = function (newValue) {
            if (this.isEditSupport()) {
                this.receiver_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Reward_stub.prototype.get_sender_id = function () {
            return this.sender_id;
        };
        Reward_stub.prototype.set_sender_id = function (newValue) {
            if (this.isEditSupport()) {
                this.sender_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Reward_stub;
    })(stub.DataObject);
    stub.Reward_stub = Reward_stub;
    stub.add_stub_instance(new Reward_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Reward_stub.js.map