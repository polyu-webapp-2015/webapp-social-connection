///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>

import Producer = lang.Producer;
import Supplier = lang.Supplier;
import Consumer = lang.Consumer;
import Task = lang.task.Task;
import TaskQuene = lang.task.TaskQueue;

module social_connection {
  /** @unsafe should not disclose this sensitive info */
  export module config {
    var session_id:string;
    export var login:boolean = false;


    export function save_login(new_session_id:string) {
      this.session_id = new_session_id;
      this.login = true;
    }

    export function getSessionId():string {
      if (this.login)
        return this.session_id;
      else
        throw new debug.IllegalStatusError();
    }

    var dataManager:DataObjectManager = new DataObjectManager();

    export function getDataManager():DataObjectManager {
      return this.dataManager;
    }
  }
  module ui {
    //import DiscussBoard = social_connection.model.DiscussBoard;
    import APICallback = api.APICallback;
    class Profile {
      data:any;

      constructor(data:any) {
        this.data = data;
      }

      toString():string {
        return this.data.toString;
      }
    }
    type SessionID=string;
    type LoginResult=[SessionID,Profile];
    export var onLogin:api.APICallback<LoginResult> = new APICallback<LoginResult>(
      function (result:api.APIResult) {
        if (result[0] != ResultCode.Success) {
          comm.log("failed to login");
          return ["", null]
        }
        var sessionId = result[1][APIField.session_id];
        var profile = result[1][APIField.profile];
        return [sessionId, profile];
      },
      function (result:LoginResult) {
        config.save_login(result[0]);
        comm.log("received profile");
        comm.log(result[1]);
      }
    );
    //export var onLogin:api.APICallback<LoginResult> = function (resultCode:string, data:any):any {
    //  if (resultCode = ResultCode.Success) {
    //    comm.log("login success");
    //    var sessionId = data[APIField.session_id];
    //    comm.log("the session id is " + sessionId);
    //    config.save_login(sessionId);
    //asynchronous_logic.getAllDiscussBoard();
    //asynchronous_logic.getAllCity()
    //asynchronous_logic.getAllAccount();
    //} else {
    //  comm.log("failed to login");
    //}
    //};
  }
  export module model {
    //export class Profile {
    //  public first_name:string;
    //  public last_name:string;
    //
    //  public toString():string {
    //    return this.first_name + " " + this.last_name;
    //  }
    //
    //  constructor(firstName:string, lastName:string) {
    //    this.first_name = firstName;
    //    this.last_name = lastName;
    //  }
    //
    //  static parse_list:api.APICallback<Profile[]> = function (resultCode:string, data:any):model.Profile[] {
    //    if (resultCode != ResultCode.Success)
    //      throw debug.IllegalStatusError;
    //    var profile_raws:any[] = data[APIField.element_array];
    //    var profile_list = profile_raws.map(function (raw) {
    //return new Profile(raw["first_name"], raw["last_name"]);
    //});
    //return profile_list;
    //}
    //}
    //export class DiscussBoard {
    //  public desc:string;
    //
    //  constructor(desc:string) {
    //    this.desc = desc;
    //  }
    //
    //  static parse_list:api.APICallback<DiscussBoard[]> = function (resultCode:string, data:any):DiscussBoard[] {
    //    comm.log("parsing discuss board list");
    //var list:DiscussBoard[] = [];
    //list.push(new DiscussBoard("123"));
    //return list;
    //}
    //}
  }
  export module asynchronous_logic {
    //TODO test import DiscussBoard_stub = stub.DiscussBoard_stub;
    import City = stub.City_stub;
    import Account = stub.Account_stub;
    import Consumer = comm.Consumer;
    import Producer = comm.Producer;
    import Account_stub = stub.Account_stub;
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

    export function getAllCity() {
      var toString = function (city:City) {
        return "City Id : " + city.get_city_id() + "\tCity Name : " + city.get_city_name();
      };
      comm.log("try to get all City");
      //var data = {};
      //data[APIField.id_array] = [];
      //api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
      var loader = new stub.City_stub();
      var consumer:Consumer<City[]> = function (citys:City[]) {
        citys.forEach(city=>comm.log(toString(city)));
      };
      loader.use_all_instance_list(consumer);
    }

    export function getAllAccount() {
      var filter:Producer<Account,boolean> = function (account:Account) {
        return account.get_account_type() == account_type.attendee;
      };
      var consumer:Consumer<Account[]> = function (list:Account[]) {
        list.forEach(account=>comm.log(account.get_email() + "\t" + account.get_password()));
      };
      social_connection.config.getDataManager().request(new Account(), filter, consumer);
    }

    //export function getAllDiscussBoard() {
    //  comm.log("try to get all discuss board");
    //  var data = {};
    //  data[APIField.id_array] = [];
    //  api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
    //}
  }
}

class DataObjectManager {
  public static getInstance():DataObjectManager {
    if (this.instance == null)
      this.instance = new DataObjectManager();
    return this.instance;
  }

  private static instance:DataObjectManager = new DataObjectManager();
  private taskQueue:lang.task.TaskQueue;

  constructor() {
    this.taskQueue = new lang.task.TaskQueue();
  }

  public request<T extends stub.DataObject>(dataObject:T, filter:Producer<T,boolean>, consumer:Consumer<T[]>) {
    var filterFunc:Consumer<T[]> = function (list:T[]) {
      consumer(list.filter(filter));
    };
    dataObject.use_all_instance_list(filterFunc)
  }
}


function main_init() {
  comm.log("stub_test:start");
  var id = "98765432";
  var password = "123456";
  social_connection.asynchronous_logic.login(id, password);
  comm.log("stub_test:end");
}
