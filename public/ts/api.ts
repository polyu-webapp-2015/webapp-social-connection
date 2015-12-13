///<reference path="lang.ts"/>
///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="utils.ts"/>
module api {
  import Consumer = lang.Consumer;
  import KeyValue = lang.KeyValue;
  export var $http:any;
  declare var $:any;

  var extras:KeyValue[] = [];

  export function addExtra(extra:KeyValue) {
    extras.push(extra);
  }

  export function setExtra(extra:KeyValue) {
    removeExtra(extra[0]);
    addExtra(extra);
  }

  export function removeExtra(key:string) {
    extras = extras.filter(function (extra) {
      return extra[0] != key
    });
  }

  export class APIParseResultError extends Error {
    public name = "APIParseResultError";

    constructor(message?:string) {
      super(message);
    }
  }

  export type APIResult=[string,any];
  export type APIResultHandler<T>=[lang.Producer<APIResult,T>,lang.Consumer<T>];


  var _api_url = "http://localhost:8000/api/main.php";

  export function set_api_url(url:string) {
    _api_url = url
  }

  export function api_call<T>(api_action:string, data:any, handler:APIResultHandler<T>, failMessage = "Failed to call api " + api_action) {
    utils.log("calling api " + api_action);
    extras.forEach(function (extra) {
      data[extra[0]] = extra[1];
    });
    var payload = {
      "action": api_action,
      "data": data
    };

    function commFailed(data:any) {
      utils.log(failMessage);
      utils.log(data);
      //alert('internal error');
      alert(failMessage);
      alert(data);
    }

    function commSuccess(data:any) {
      try {
        var apiResult:APIResult = [data[APIField.result_code], data];
        var t:T = handler[0](apiResult);
        handler[1](t);
      } catch (exception) {
        utils.log("Failed to parse result from api call");
        commFailed(data);
      }
    }

    if ($http != null) {
      $http.post(_api_url, {
          action: api_action,
          data: JSON.stringify(data)
        })
        .success(commSuccess)
        .error(commFailed);
    } else {
      $.ajax({
        type: "POST",
        url: _api_url,
        crossDomain: true,
        dataType: 'jsonp',
        success: function (e) {
          try {
            var result = JSON.parse(e);
            commSuccess(result);
            //try {
            //  var resultCode = result[APIField.result_code];
            //var data = result[APIField.data];
            //success(resultCode, data);
            //commSuccess(result);
            //} catch (exception) {

            //utils.log("failed to process api result");
            //utils.log(exception);
            //utils.log(e);
            //}
          } catch (exception) {
            utils.log("failed to parse json from api result");
            commFailed(e);
            //utils.log(exception);
            //utils.log(e);
          }
        }
      }).error(commFailed);
    }
  }

  export function use_all_row<T>(table_name:string, handler:APIResultHandler<T>) {
    var data = {};
    data[APIField.table_name] = table_name;
    api_call<T>(_api_GetTableRowList, data, handler)
  }

  export function set_all_row(table_name:string, rows:any[]) {
  }
}