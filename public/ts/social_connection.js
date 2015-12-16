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
var social_connection;
(function (social_connection) {
    /** @unsafe should not disclose this sensitive info */
    var config;
    (function (config) {
        //var session_id:string;
        //export var login:boolean = false;
        var __session_id = "session_id";
        function save_login(new_session_id) {
            sessionStorage.setItem(__session_id, new_session_id);
            //this.session_id = new_session_id;
            //this.login = true;
            api.setExtra([APIField.session_id, new_session_id]);
            utils.log("saved session id");
        }
        config.save_login = save_login;
        function getSessionId() {
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
        config.getSessionId = getSessionId;
    })(config = social_connection.config || (social_connection.config = {}));
    var ui;
    (function (ui) {
        //export type APIResultHandler<T>=[lang.Producer<APIResult,T>,lang.Consumer<T>];
        ui.onLogin = function (loginResult) {
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
            var filter = function (x) {
                return true;
            };
            var consumer = function (xs) {
                xs.forEach(function (city) {
                    return utils.log("city " + city.get_city_id() + "  " + city.get_city_name());
                });
                //utils.log("get again, should be much faster");
                //setTimeout(function () {
                //  getCityList();
                //});
            };
            var forceUpdate = true;
            DataObjectManager.request(instance, filter, consumer, forceUpdate);
        }
    })(ui || (ui = {}));
    var asynchronous_logic;
    (function (asynchronous_logic) {
        var Account = stub.Account_stub;
        //import APIResultHandler<T>=api.APIResultHandler<T>;
        function login(id, password) {
            utils.indent(1);
            utils.log("try to login");
            var data = {};
            data[APIField.emailOrPhoneNum] = id;
            data[APIField.password] = password;
            var producer = function (apiResult) {
                var resultCode = apiResult[0];
                if (resultCode == ResultCode.Success) {
                    var sessionId = apiResult[1][APIField.session_id];
                    var profile = new model.Profile("first", "second");
                    return [sessionId, profile];
                }
                else {
                    throw new debug.APIParseResultError();
                }
            };
            api.api_call(_api_Login, data, [producer, ui.onLogin]);
            utils.log("sent login command");
            utils.indent(-1);
        }
        asynchronous_logic.login = login;
        function getAllCity() {
            var toString = function (city) {
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
            utils.log("request now");
        }
        asynchronous_logic.getAllCity = getAllCity;
        function getAllAccount() {
            var filter = function (account) {
                return account.get_account_type() == account_type.attendee;
            };
            var consumer = function (list) {
                list.forEach(function (account) { return utils.log(account.get_email() + "\t" + account.get_password()); });
            };
            DataObjectManager.request(new Account(), filter, consumer);
        }
        asynchronous_logic.getAllAccount = getAllAccount;
    })(asynchronous_logic = social_connection.asynchronous_logic || (social_connection.asynchronous_logic = {}));
})(social_connection || (social_connection = {}));
function main_init() {
    utils.log("main_init:start");
    //var id = "98765432";
    //var password = "123456";
    //social_connection.asynchronous_logic.login(id, password);
    utils.log("main_init:end");
}
//# sourceMappingURL=social_connection.js.map