var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="DataObject.ts"/>
var stub;
(function (stub) {
    var Venus_stub = (function (_super) {
        __extends(Venus_stub, _super);
        function Venus_stub() {
            _super.apply(this, arguments);
        }
        /* key */
        Venus_stub.__venue_id = function () {
            return "venue_id";
        };
        Venus_stub.__floor_id = function () {
            return "floor_id";
        };
        /* implement DataObject */
        Venus_stub.prototype.tableName = function () {
            return "Venus";
        };
        Venus_stub.prototype.uniqueKeyList = function () {
            var list = [];
            list.push("venue_id");
            return list;
        };
        Venus_stub.prototype.parseObject = function (rawObject) {
            return null; //TODO
        };
        Venus_stub.prototype.toObject = function (instant) {
            return null; //TODO
        };
        /* getter and setter */
        Venus_stub.prototype.get_venue_id = function () {
            return this.venue_id;
        };
        Venus_stub.prototype.set_venue_id = function (newValue) {
            if (this.isEditSupport()) {
                this.venue_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        Venus_stub.prototype.get_floor_id = function () {
            return this.floor_id;
        };
        Venus_stub.prototype.set_floor_id = function (newValue) {
            if (this.isEditSupport()) {
                this.floor_id = newValue;
            }
            else {
                throw new stub.DataObjectEditError(this);
            }
        };
        return Venus_stub;
    })(stub.DataObject);
    stub.Venus_stub = Venus_stub;
})(stub || (stub = {}));
//# sourceMappingURL=Venus.js.map