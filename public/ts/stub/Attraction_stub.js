var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Attraction_stub = (function (_super) {
        __extends(Attraction_stub, _super);
        function Attraction_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Attraction_stub.__event_id = function () {
            return "event_id";
        };
        /* implement DataObject */
        Attraction_stub.prototype.tableName = function () {
            return "Attraction";
        };
        Attraction_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Attraction_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("event_id");
            return list;
        };
        Attraction_stub.prototype.parseObject = function (rawObject) {
            var instance = new Attraction_stub();
            if (rawObject.hasOwnProperty('event_id'))
                instance.event_id = rawObject.event_id;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Attraction_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Attraction_stub.__event_id()] = instance.event_id;
            return rawObject;
        };
        /* getter and setter */
        Attraction_stub.prototype.get_event_id = function () {
            return this.event_id * 1;
        };
        Attraction_stub.prototype.set_event_id = function (newValue) {
            if (this.isEditSupport()) {
                this.event_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Attraction_stub;
    })(stub.DataObject);
    stub.Attraction_stub = Attraction_stub;
    stub.add_stub_instance(new Attraction_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Attraction_stub.js.map