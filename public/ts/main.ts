///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>

module social_connection {
  /** @unsafe should not disclose this sensitive info */
  export module config {
    var session_id:string;
    export var login:boolean = false;


    export function save_login(session_id:string) {
      this.session_id = session_id;
      login = true;
    }

    export function getSessionId():string {
      if (login)
        return this.session_id;
      else
        throw new debug.IllegalStatusError();
    }
  }
  export module ui {
    //import DiscussBoard = social_connection.model.DiscussBoard;
    export var onLogin:api.APICallback<any> = function (resultCode:string, data:any):any {
      if (resultCode = ResultCode.Success) {
        comm.log("login success");
        var sessionId = data[APIField.session_id];
        comm.log("the session id is " + sessionId);
        config.save_login(sessionId);
        //asynchronous_logic.getAllDiscussBoard();
        getAllCity()
      } else {
        comm.log("failed to login");
      }
    };

    export function onReceivedCitys(citys:model.City[]) {
      citys.forEach(city=>comm.log("the city name is " + city.cityName))
    }
  }
  export module model {
    //TODO this part simulate the stub
    export class City {
      constructor(public cityId:number, public cityName:string) {
      }
    }
  }
  export module asynchronous_logic {
    //TODO test import DiscussBoard_stub = stub.DiscussBoard_stub;
    import City_stub = stub.City_stub;
    import Consumer = comm.Consumer;
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



    //export function getAllDiscussBoard() {
    //  comm.log("try to get all discuss board");
    //  var data = {};
    //  data[APIField.id_array] = [];
    //  api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
    //}
  }
}
module debug {
  export class IllegalStatusError extends Error {
    public name = "IllegalStatusError";
  }
  export class APIFailedError extends Error {
    public name = "APICallFailed";

    constructor(result:any) {
      super();
      comm.log(result);
    }
  }
}
module comm {
  var indentText = " ";
  var indentCount = 0;

  function getIndentPrefix():string {
    var indent = "";
    for (let i = 0; i < indentCount; i++)
      indent += indentText;
    return indent;
  }

  export function log(message:any = "") {
    message = message.toString();
    message = getIndentPrefix() + message;
    console.log(message);
    var element = document.createElement("span");
    element.innerHTML = "<pre>\n" + message + "</pre>";
    document.body.appendChild(element);
  }

  export function indent(delta:number) {
    indentCount += delta;
  }

  export interface Consumer<T> {
    (t:T);
  }
}
module api {
  import Consumer = comm.Consumer;
  export var $http:any;
  declare var $:any;

  export interface APICallback<T> {
    (resultCode:string, data:any, consumer:Consumer<T>);
  }

  var _api_url = "http://58.96.176.223:9000/api/main.php";

  export function api_call<T>(api_action:string, data:any, success:APICallback<T>, failMessage = "Failed to call api " + api_action) {
    comm.log("calling api " + api_action);
    if (social_connection.config.login) {
      data[APIField.session_id] = social_connection.config.getSessionId();
    }
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

    if ($http != null) {
      comm.log("using \$http");
      $http.post(_api_url, {
          action: api_action,
          data: JSON.stringify(data)
        })
        .success(function (data, status, headers, config) {
          var resultCode = data[APIField.result_code];
          success(resultCode, data);
          //if (resultCode == ResultCode.Success) {
          // success(resultCode, data);
          //}
          //else
          // failed(data, status, headers, config);
        })
        .error(function (data, status, headers, config) {
          failed(data, status, headers, config);
        });
    } else {
      comm.log("using jquery ajax");
      $.ajax({
        type: "POST",
        url: _api_url,
        crossDomain: true,
        success: function (e) {
          try {
            var result = JSON.parse(e);
            try {
              var resultCode = result[APIField.result_code];
              var data = result[APIField.data];
              success(resultCode, data);
            } catch (exception) {
              comm.log("failed to process api result");
              comm.log(exception);
              comm.log(e);
            }
          } catch (exception) {
            comm.log("failed to parse json from api result");
            comm.log(exception);
            comm.log(e);
          }
        }
      }).error(function (result:any) {
        comm.log(failMessage);
        comm.log(result);
      });
    }
  }

  export function get_all_row(table_name:string, callback:APICallback<any>) {
    var data = {};
    data[APIField.table_name] = table_name;
    api_call(_api_GetTableRowList, data, callback)
  }

  export function set_all_row(table_name:string, rows:any[]) {
  }
}
module task {
  export interface Task {
    ():any;
  }
  export class TaskQueue {
    constructor(taskQueue:Task[] = []) {
      this.taskQueue = taskQueue;
    }

    private taskQueue:Task[];

    public startTasks() {
      while (this.hasNextTask()) {
        var task = this.nextTask();
        task();
      }
    }

    public addTask(task:Task) {
      this.taskQueue.push(task);
    }

    private hasNextTask():boolean {
      return this.taskQueue.length > 0;
    }

    private nextTask():Task {
      if (this.hasNextTask()) {
        return this.taskQueue.shift();
      } else {
        throw new NoNextTaskError();
      }
    }
  }
  class TaskError extends Error {
    public name = "TaskError";

    constructor(public message?:string) {
      super(message);
    }
  }
  class NoNextTaskError extends TaskError {
    public name = "NoNextTaskError";
  }

}


function main_init() {
  comm.log("stub_test:start");
  var id = "98765432";
  var password = "123456";
  social_connection.asynchronous_logic.login(id, password);
  comm.log("stub_test:end");
}

 function getAllCity() {
      comm.log("try to get all City");
      //var data = {};
      //data[APIField.id_array] = [];
      //api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
      var loader = new stub.City_stub();
      var consumer:comm.Consumer<stub.City_stub[]> = function (citys:stub.City_stub[]) {
        citys.map(city => {
          comm.log(city.get_city_name());
          return null;
        });
      };
      loader.use_all_instance_list(consumer);
    }
