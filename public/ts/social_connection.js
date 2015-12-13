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
        var session_id;
        config.login = false;
        function save_login(new_session_id) {
            this.session_id = new_session_id;
            this.login = true;
        }
        config.save_login = save_login;
        function getSessionId() {
            if (this.login)
                return this.session_id;
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
        };
    })(ui || (ui = {}));
    var model;
    (function (model) {
        var Profile = (function () {
            function Profile(first_name, last_name) {
                this.first_name = first_name;
                this.last_name = last_name;
            }
            return Profile;
        })();
        model.Profile = Profile;
    })(model = social_connection.model || (social_connection.model = {}));
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
                    var loginResult = [sessionId, profile];
                    return loginResult;
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
            var loader = new stub.City_stub();
            var consumer = function (citys) {
                citys.forEach(function (city) { return utils.log(toString(city)); });
            };
            loader.use_all_instance_list(consumer);
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
    utils.log("stub_test:start");
    var id = "98765432";
    var password = "123456";
    social_connection.asynchronous_logic.login(id, password);
    utils.log("stub_test:end");
}
//# sourceMappingURL=social_connection.js.map