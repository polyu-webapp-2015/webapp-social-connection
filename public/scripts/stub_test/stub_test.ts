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

module social_connection {
  module ui {
    export var onLogin:api.APICallback = function (resultCode:string, data:any):any {
      if (resultCode = ResultCode.Success) {
        comm.log("login success");
        var sessionId = data[APIField.session_id];
        comm.log("the session id is " + sessionId);
      } else {
        comm.log("failed to login");
      }
    };
    //var onLogin = new onLogin();
    //export function onLogin() {
    //  comm.log("on login");
    //  comm.indent(1);
    //
    //  comm.indent(-1);
    //}
  }
  export module logic {
    export function login(id:string, password:string) {
      comm.indent(1);
      comm.log("try to login");
      var data = {};
      data[APIField.emailOrPhoneNum] = id;
      data[APIField.password] = password;
      api.api_call(_api_Login, data, ui.onLogin);
      comm.log("sent login command");
      comm.indent(-1);
    }
  }
}
module comm {
  var indentText = "  ";
  var indentCount = 0;

  function getIndentPrefix():string {
    var indent = "";
    for (let i = 0; i < indentCount; i++)
      indent += indentText;
    return indent;
  }

  export function log(message:string = "") {
    message = getIndentPrefix() + message;
    console.log(message);
    var element = document.createElement("span");
    element.innerHTML = "<pre>\n" + message + "</pre>";
    document.body.appendChild(element);
  }

  export function indent(delta:number) {
    indentCount += delta;
  }
}
module api {
  export var $http:any;
  declare var $:any;
  export interface APICallback {
    (resultCode:string, data:any):any;
  }

  var _api_url = "http://localhost:8000/api/main.php";

  export function api_call(api_action:string, data:any, success:APICallback, failMessage = "Failed to call api " + api_action) {
    comm.log("calling api " + api_action);
    var payload = {
      "action": api_action,
      "data": data
    };

    function failed(data:any, status:any, headers:any, config:any) {
      comm.log(failMessage);
      comm.log(data);
      //alert('internal error');
      alert(failMessage);
      alert(data);
    }

    $http.post(_api_url, {
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
}
