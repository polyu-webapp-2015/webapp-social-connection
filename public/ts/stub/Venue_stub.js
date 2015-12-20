var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Venue_stub = (function (_super) {
        __extends(Venue_stub, _super);
        function Venue_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Venue_stub.__venue_id = function () {
            return "venue_id";
        };
        Venue_stub.__floor_id = function () {
            return "floor_id";
        };
        Venue_stub.__venue_name = function () {
            return "venue_name";
        };
        /* implement DataObject */
        Venue_stub.prototype.tableName = function () {
            return "Venue";
        };
        Venue_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("venue_id");
            return list;
        };
        Venue_stub.prototype.allKeyList = function () {
            var list = [];
            list.push("venue_id");
            list.push("floor_id");
            list.push("venue_name");
            return list;
        };
        Venue_stub.prototype.parseObject = function (rawObject) {
            var instance = new Venue_stub();
            if (rawObject.hasOwnProperty('venue_id'))
                instance.venue_id = rawObject.venue_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('floor_id'))
                instance.floor_id = rawObject.floor_id;
            else
                throw new stub.DataObjectParseError(this);
            if (rawObject.hasOwnProperty('venue_name'))
                instance.venue_name = rawObject.venue_name;
            else
                throw new stub.DataObjectParseError(this);
            return instance;
        };
        Venue_stub.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            var rawObject = {};
            rawObject[Venue_stub.__venue_id()] = instance.venue_id;
            rawObject[Venue_stub.__floor_id()] = instance.floor_id;
            rawObject[Venue_stub.__venue_name()] = instance.venue_name;
            return rawObject;
        };
        /* getter and setter */
        Venue_stub.prototype.get_venue_id = function () {
            return this.venue_id * 1;
        };
        Venue_stub.prototype.set_venue_id = function (newValue) {
            if (this.isEditSupport()) {
                this.venue_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Venue_stub.prototype.get_floor_id = function () {
            return this.floor_id * 1;
        };
        Venue_stub.prototype.set_floor_id = function (newValue) {
            if (this.isEditSupport()) {
                this.floor_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Venue_stub.prototype.get_venue_name = function () {
            return this.venue_name;
        };
        Venue_stub.prototype.set_venue_name = function (newValue) {
            if (this.isEditSupport()) {
                this.venue_name = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Venue_stub;
    })(stub.DataObject);
    stub.Venue_stub = Venue_stub;
    stub.add_stub_instance(new Venue_stub());
})(stub || (stub = {}));
//# sourceMappingURL=Venue_stub.js.map