///<reference path="../../js/enum/APIFieldEnum.ts"/>
///<reference path="../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../../js/api_list.ts"/>
function stub_test_init() {
    comm.log("stub_test:start");
    var id = "98765432";
    var password = "123456";
    social_connection.logic.login(id, password);
    comm.log("stub_test:end");
}
var social_connection;
(function (social_connection) {
    var ui;
    (function (ui) {
        ui.onLogin = function (resultCode, data) {
            if (resultCode = ResultCode.Success) {
                comm.log("login success");
                var sessionId = data[APIField.session_id];
                comm.log("the session id is " + sessionId);
            }
            else {
                comm.log("failed to login");
            }
        };
    })(ui || (ui = {}));
    var logic;
    (function (logic) {
        function login(id, password) {
            comm.indent(1);
            comm.log("try to login");
            var data = {};
            data[APIField.emailOrPhoneNum] = id;
            data[APIField.password] = password;
            api.api_call(_api_Login, data, ui.onLogin);
            comm.log("sent login command");
            comm.indent(-1);
        }
        logic.login = login;
    })(logic = social_connection.logic || (social_connection.logic = {}));
})(social_connection || (social_connection = {}));
var comm;
(function (comm) {
    var indentText = "  ";
    var indentCount = 0;
    function getIndentPrefix() {
        var indent = "";
        for (var i = 0; i < indentCount; i++)
            indent += indentText;
        return indent;
    }
    function log(message) {
        if (message === void 0) { message = ""; }
        message = getIndentPrefix() + message;
        console.log(message);
        var element = document.createElement("span");
        element.innerHTML = "<pre>\n" + message + "</pre>";
        document.body.appendChild(element);
    }
    comm.log = log;
    function indent(delta) {
        indentCount += delta;
    }
    comm.indent = indent;
})(comm || (comm = {}));
var api;
(function (api) {
    var _api_url = "http://localhost:8000/api/main.php";
    function api_call(api_action, data, success, failMessage) {
        if (failMessage === void 0) { failMessage = "Failed to call api " + api_action; }
        comm.log("calling api " + api_action);
        var payload = {
            "action": api_action,
            "data": data
        };
        function failed(data, status, headers, config) {
            comm.log(failMessage);
            comm.log(data);
            //alert('internal error');
            alert(failMessage);
            alert(data);
        }
        api.$http.post(_api_url, {
            action: api_action,
            data: JSON.stringify(data)
        })
            .success(function (data, status, headers, config) {
            var resultCode = data[APIField.result_code];
            success(resultCode, data);
            //if (resultCode == ResultCode.Success) {
            //  success(resultCode, data);
            //}
            //else
            //  failed(data, status, headers, config);
        })
            .error(function (data, status, headers, config) {
            failed(data, status, headers, config);
        });
        //$.ajax({
        //  type: "POST",
        //  url: _api_url,
        //  crossDomain: true,
        //  dataType: 'jsonp',
        //  success: function (e) {
        //    try {
        //      var result = JSON.parse(e);
        //      try {
        //        var resultCode = result[APIField.result_code];
        //        var data = result[APIField.data];
        //        success(resultCode, data);
        //      } catch (exception) {
        //        log("failed to process api result");
        //        log(exception);
        //        log(e);
        //      }
        //    } catch (exception) {
        //      log("failed to parse json from api result");
        //      log(exception);
        //      log(e);
        //    }
        //  }
        //}).error(function (result:any) {
        //  log(failMessage);
        //  log(result);
        //});
    }
    api.api_call = api_call;
})(api || (api = {}));
//# sourceMappingURL=stub_test.js.map