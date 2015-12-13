var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Exhibition_stub = (function (_super) {
        __extends(Exhibition_stub, _super);
        function Exhibition_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Exhibition_stub.__event_id = function () {
            return "event_id";
        };
        /* implement DataObject */
        Exhibition_stub.prototype.tableName = function () {
            return "Exhibition";
        };
        Exhibition_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Exhibition_stub.prototype.parseObject = function (rawObject) {
            var instance = new Exhibition_stub();
            instance.event_id = rawObject[Exhibition_stub.__event_id()];
            return instance;
        };
        Exhibition_stub.prototype.toObject = function (instant) {
            var rawObject = {};
            rawObject[Exhibition_stub.__event_id()] = instant.event_id;
            return rawObject;
        };
        /* getter and setter */
        Exhibition_stub.prototype.get_event_id = function () {
            return this.event_id;
        };
        Exhibition_stub.prototype.set_event_id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Exhibition_stub;
    })(stub.DataObject);
    stub.Exhibition_stub = Exhibition_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Exhibition_stub.js.map