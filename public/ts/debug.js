var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var debug;
(function (debug) {
    var APIError = (function (_super) {
        __extends(APIError, _super);
        function APIError(message) {
            _super.call(this, message);
            this.name = "APIError";
        }
        return APIError;
    })(Error);
    debug.APIError = APIError;
    var IllegalStatusError = (function (_super) {
        __extends(IllegalStatusError, _super);
        function IllegalStatusError(message) {
            _super.call(this, message);
            this.name = "IllegalStatusError";
        }
        return IllegalStatusError;
    })(Error);
    debug.IllegalStatusError = IllegalStatusError;
    var APIFailedError = (function (_super) {
        __extends(APIFailedError, _super);
        function APIFailedError(message) {
            _super.call(this, message);
            this.name = "APICallFailed";
        }
        return APIFailedError;
    })(Error);
    debug.APIFailedError = APIFailedError;
    var APIParseResultError = (function (_super) {
        __extends(APIParseResultError, _super);
        function APIParseResultError(message) {
            _super.call(this, message);
            this.name = "APIParseResultError";
        }
        return APIParseResultError;
    })(APIError);
    debug.APIParseResultError = APIParseResultError;
    var APICallError = (function (_super) {
        __extends(APICallError, _super);
        function APICallError(message) {
            _super.call(this, message);
            this.name = "APICallError";
        }
        return APICallError;
    })(APIError);
    debug.APICallError = APICallError;
})(debug || (debug = {}));
//# sourceMappingURL=debug.js.map