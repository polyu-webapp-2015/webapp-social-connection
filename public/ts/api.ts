///<reference path="lang.ts"/>
///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="utils.ts"/>
declare var serv_addr:string;
declare var _$http:any;
//declare var _$global:any;
module api {
  import Consumer = lang.Consumer;
  import KeyValue = lang.KeyValue;
  export var $http:any;
  declare var $:any;

  var extras:KeyValue<string,string>[] = [];

  export function addExtra(extra:KeyValue<string,string>) {
    extras.push(extra);
  }

  export function setExtra(extra:KeyValue<string,string>) {
    removeExtra(extra[0]);
    addExtra(extra);
  }

  export function removeExtra(key:string) {
    extras = extras.filter(function (extra) {
      return extra[0] != key
    });
  }

  export type APIResult=[string,any];
  export type APIResultHandler<T>=[lang.Producer<APIResult,T>,lang.Consumer<T>];

  //var _api_url = "http://localhost:8000/api/main.php";
  var _api_url = serv_addr;

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
        /* process data (transform) */
        var t:T = handler[0](apiResult);
      } catch (exception) {
        utils.log("Failed to parse result from api call");
        commFailed(data);
      }
      /* use data (consume) */
      handler[1](t);
    }

    if ($http == null)
      $http = _$http;
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
        //dataType: 'jsonp',
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
            //utils.log("failed to parse json from api result");
            //commFailed(e);
            commSuccess(e);
          }
        }
      }).error(commFailed);
    }
  }

  export function use_all_row<T>(table_name:string, handler:APIResultHandler<T>) {
    var data = {};
    data[APIField.table_name] = table_name;
    api_call<T>(_api_GetTableRowList, data, handler);
  }

  //export type Row=Array<[string,any]>;
  export type Row=any;

  /**
   * @type T the type of id (most likely INT (number))
   * */
  export function create_all_row<T>(table_name:string, row_array:Row[], handler:APIResultHandler<T[]>) {
    var data = {};
    data[APIField.table_name] = table_name;
    data[APIField.element_array] = row_array;
    api_call<T[]>(_api_AddTableRowList, data, handler);
  }

  export function set_all_row(table_name:string, rows:any[]) {
  }
}