///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>
///<reference path="api.ts"/>
///<reference path="DataObjectManager.ts"/>

//import Producer = lang.Producer;
//import Supplier = lang.Supplier;
//import Consumer = lang.Consumer;

module social_connection {
  /** @unsafe should not disclose this sensitive info */
  export module config {
    //var session_id:string;
    //export var login:boolean = false;
    const __session_id = "session_id";

    export function save_login(new_session_id:string) {
      sessionStorage.setItem(__session_id, new_session_id);
      //this.session_id = new_session_id;
      //this.login = true;
      api.setExtra([APIField.session_id, new_session_id]);
      utils.log("saved session id");
    }

    export function getSessionId():string {
      //if (this.login)
      //  return this.session_id;
      //else
      //  throw new debug.IllegalStatusError();
      var session_id = sessionStorage.getItem(__session_id);
      if (session_id != null)
        return session_id;
      else
        throw new debug.IllegalStatusError();
    }
  }
  module ui {
    //import DiscussBoard = social_connection.model.DiscussBoard;
    import APIResultHandler = api.APIResultHandler;
    import getAllCity = social_connection.asynchronous_logic.getAllCity;
    import City_stub = stub.City_stub;
    export type SessionID=string;
    export type LoginResult=[SessionID,model.Profile];
    //export type APIResultHandler<T>=[lang.Producer<APIResult,T>,lang.Consumer<T>];
    export var onLogin:Consumer<LoginResult> = function (loginResult) {
      config.save_login(loginResult[0]);
      utils.log("login success, session id is " + loginResult[0]);
      utils.log("received profile");
      utils.log(loginResult[1]);
      utils.log("waiting to get city list");
      setTimeout(function () {
        utils.log("calling get city list function");
        getCityList();
      });
    };

    function getCityList() {
      utils.log("try to get city list now ");
      var instance = new stub.City_stub();
      //instance.use_all_instance_list(function (citys:stub.City_stub[]) {
      //  citys.forEach(city=>
      //    utils.log("city " + city.get_city_id() + "  " + city.get_city_name()));
      //});
      var filter = function (x:City_stub) {
        return true
      };
      var consumer = function (xs:City_stub[]) {
        xs.forEach(city=>
          utils.log("city " + city.get_city_id() + "  " + city.get_city_name())
        );
        //utils.log("get again, should be much faster");
        //setTimeout(function () {
        //  getCityList();
        //});
      };
      var forceUpdate = true;
      DataObjectManager.request(instance, filter, consumer, forceUpdate);
    }
  }
  export module model {
    //export class Profile {
    //  constructor(public first_name:string, public last_name:string) {
    //  }
    //}
  }
  export module asynchronous_logic {
    //TODO test import DiscussBoard_stub = stub.DiscussBoard_stub;
    import City = stub.City_stub;
    import Account = stub.Account_stub;
    import Consumer = lang.Consumer;
    import Producer = lang.Producer;
    import Account_stub = stub.Account_stub;
    import APIResult = api.APIResult;
    //import APIResultHandler<T>=api.APIResultHandler<T>;
    export function login(id:string, password:string) {
      utils.indent(1);
      utils.log("try to login");
      var data = {};
      data[APIField.emailOrPhoneNum] = id;
      data[APIField.password] = password;
      var producer:Producer<APIResult,ui.LoginResult> = function (apiResult:APIResult) {
        var resultCode:string = apiResult[0];
        if (resultCode == ResultCode.Success) {
          var sessionId:ui.SessionID = apiResult[1][APIField.session_id];
          var profile:model.Profile = new model.Profile("first", "second");
          return [sessionId, profile];
        } else {
          throw new debug.APIParseResultError();
        }
      };
      api.api_call(_api_Login, data, [producer, ui.onLogin]);
      utils.log("sent login command");
      utils.indent(-1);
    }

    export function getAllCity() {
      var toString = function (city:City) {
        return "City Id : " + city.get_city_id() + "\tCity Name : " + city.get_city_name();
      };
      utils.log("try to get all City");
      //var data = {};
      //data[APIField.id_array] = [];
      //api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
      //var loader = new stub.City_stub();
      //var consumer:Consumer<City[]> = function (citys:City[]) {
      //  citys.forEach(city=>utils.log(toString(city)));
      //};
      //loader.use_all_instance_list(consumer);
      utils.log("request now")
    }

    export function getAllAccount() {
      var filter:Producer<Account,boolean> = function (account:Account) {
        return account.get_account_type() == account_type.attendee;
      };
      var consumer:Consumer<Account[]> = function (list:Account[]) {
        list.forEach(account=>utils.log(account.get_email() + "\t" + account.get_password()));
      };
      DataObjectManager.request(new Account(), filter, consumer);
    }

    //export function getAllDiscussBoard() {
    //  utils.log("try to get all discuss board");
    //  var data = {};
    //  data[APIField.id_array] = [];
    //  api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
    //}
  }
}

function main_init() {
  utils.log("main_init:start");
  //var id = "98765432";
  //var password = "123456";
  //social_connection.asynchronous_logic.login(id, password);
  utils.log("main_init:end");
}
