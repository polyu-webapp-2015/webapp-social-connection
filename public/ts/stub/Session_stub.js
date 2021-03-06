var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Session_stub = (function (_super) {
        __extends(Session_stub, _super);
        function Session_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Session_stub.__event_id = function () {
            return "event_id";
        };
        /* implement DataObject */
        Session_stub.prototype.tableName = function () {
            return "Session";
        };
        Session_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Session_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Session_stub.prototype.parseObject = function (rawObject) {
            var instance = new Session_stub();
            if (rawObject.hasOwnProperty('event_id'))
                instance.event_id = rawObject.event_id;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Session_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Session_stub.__event_id()] = instance.event_id;
            return rawObject;
        };
        /* getter and setter */
        Session_stub.prototype.get_event_id = function () {
            return this.event_id * 1;
        };
        Session_stub.prototype.set_event_id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Session_stub;
    })(stub.DataObject);
    stub.Session_stub = Session_stub;
    stub.add_stub_instance(new Session_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Session_stub.js.map