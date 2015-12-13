var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="utils.ts"/>
var debug;
(function (debug) {
    var IllegalStatusError = (function (_super) {
        __extends(IllegalStatusError, _super);
        function IllegalStatusError() {
            _super.apply(this, arguments);
            this.name = "IllegalStatusError";
        }
        return IllegalStatusError;
    })(Error);
    debug.IllegalStatusError = IllegalStatusError;
    var APIFailedError = (function (_super) {
        __extends(APIFailedError, _super);
        function APIFailedError(result) {
            _super.call(this);
            this.name = "APICallFailed";
            utils.log(result);
        }
        return APIFailedError;
    })(Error);
    debug.APIFailedError = APIFailedError;
})(debug || (debug = {}));
//# sourceMappingURL=debug.js.map