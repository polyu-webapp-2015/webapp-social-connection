///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>
var TaskQuene = lang.task.TaskQueue;
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
        var dataManager = new DataObjectManager();
        function getDataManager() {
            return this.dataManager;
        }
        config.getDataManager = getDataManager;
    })(config = social_connection.config || (social_connection.config = {}));
    var ui;
    (function (ui) {
        //import DiscussBoard = social_connection.model.DiscussBoard;
        var APICallback = api.APICallback;
        var Profile = (function () {
            function Profile(data) {
                this.data = data;
            }
            Profile.prototype.toString = function () {
                return this.data.toString;
            };
            return Profile;
        })();
        ui.onLogin = new APICallback(function (result) {
            if (result[0] != ResultCode.Success) {
                comm.log("failed to login");
                return ["", null];
            }
            var sessionId = result[1][APIField.session_id];
            var profile = result[1][APIField.profile];
            return [sessionId, profile];
        }, function (result) {
            config.save_login(result[0]);
            comm.log("received profile");
            comm.log(result[1]);
        });
    })(ui || (ui = {}));
    var asynchronous_logic;
    (function (asynchronous_logic) {
        var Account = stub.Account_stub;
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
        asynchronous_logic.login = login;
        function getAllCity() {
            var toString = function (city) {
                return "City Id : " + city.get_city_id() + "\tCity Name : " + city.get_city_name();
            };
            comm.log("try to get all City");
            //var data = {};
            //data[APIField.id_array] = [];
            //api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
            var loader = new stub.City_stub();
            var consumer = function (citys) {
                citys.forEach(function (city) { return comm.log(toString(city)); });
            };
            loader.use_all_instance_list(consumer);
        }
        asynchronous_logic.getAllCity = getAllCity;
        function getAllAccount() {
            var filter = function (account) {
                return account.get_account_type() == account_type.attendee;
            };
            var consumer = function (list) {
                list.forEach(function (account) { return comm.log(account.get_email() + "\t" + account.get_password()); });
            };
            social_connection.config.getDataManager().request(new Account(), filter, consumer);
        }
        asynchronous_logic.getAllAccount = getAllAccount;
    })(asynchronous_logic = social_connection.asynchronous_logic || (social_connection.asynchronous_logic = {}));
})(social_connection || (social_connection = {}));
var DataObjectManager = (function () {
    function DataObjectManager() {
        this.taskQueue = new lang.task.TaskQueue();
    }
    DataObjectManager.getInstance = function () {
        if (this.instance == null)
            this.instance = new DataObjectManager();
        return this.instance;
    };
    DataObjectManager.prototype.request = function (dataObject, filter, consumer) {
        var filterFunc = function (list) {
            consumer(list.filter(filter));
        };
        dataObject.use_all_instance_list(filterFunc);
    };
    DataObjectManager.instance = new DataObjectManager();
    return DataObjectManager;
})();
function main_init() {
    comm.log("stub_test:start");
    var id = "98765432";
    var password = "123456";
    social_connection.asynchronous_logic.login(id, password);
    comm.log("stub_test:end");
}
//# sourceMappingURL=social_connection.js.map