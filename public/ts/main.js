///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var social_connection;
(function (social_connection) {
    /** @unsafe should not disclose this sensitive info */
    var config;
    (function (config) {
        var session_id;
        config.login = false;
        function save_login(session_id) {
            this.session_id = session_id;
            config.login = true;
        }
        config.save_login = save_login;
        function getSessionId() {
            if (config.login)
                return this.session_id;
            else
                throw new debug.IllegalStatusError();
        }
        config.getSessionId = getSessionId;
    })(config = social_connection.config || (social_connection.config = {}));
    var ui;
    (function (ui) {
        //import DiscussBoard = social_connection.model.DiscussBoard;
        ui.onLogin = function (resultCode, data) {
            if (resultCode = ResultCode.Success) {
                comm.log("login success");
                var sessionId = data[APIField.session_id];
                comm.log("the session id is " + sessionId);
                config.save_login(sessionId);
                //asynchronous_logic.getAllDiscussBoard();
                asynchronous_logic.getAllCity();
            }
            else {
                comm.log("failed to login");
            }
        };
    })(ui || (ui = {}));
    var asynchronous_logic;
    (function (asynchronous_logic) {
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
            comm.log("try to get all City");
            //var data = {};
            //data[APIField.id_array] = [];
            //api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
            var loader = new stub.City_stub();
            var consumer = function (citys) {
                citys.map(function (city) {
                    comm.log(city.get_city_name());
                    return null;
                });
            };
            loader.use_all_instance_list(consumer);
        }
        asynchronous_logic.getAllCity = getAllCity;
    })(asynchronous_logic = social_connection.asynchronous_logic || (social_connection.asynchronous_logic = {}));
})(social_connection || (social_connection = {}));
var debug;
(function (debug) {
    var IllegalStatusError = (function (_super) {
        __extends(IllegalStatusError, _super);
        function IllegalStatusError() {
            _super.apply(this, arguments);
            this.name = "IllegalStatusError";
        }
        return IllegalStatusError;
    })(Error);
    debug.IllegalStatusError = IllegalStatusError;
    var APIFailedError = (function (_super) {
        __extends(APIFailedError, _super);
        function APIFailedError(result) {
            _super.call(this);
            this.name = "APICallFailed";
            comm.log(result);
        }
        return APIFailedError;
    })(Error);
    debug.APIFailedError = APIFailedError;
})(debug || (debug = {}));
var comm;
(function (comm) {
    var indentText = " ";
    var indentCount = 0;
    function getIndentPrefix() {
        var indent = "";
        for (var i = 0; i < indentCount; i++)
            indent += indentText;
        return indent;
    }
    function log(message) {
        if (message === void 0) { message = ""; }
        message = message.toString();
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
        if (social_connection.config.login) {
            data[APIField.session_id] = social_connection.config.getSessionId();
        }
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
        if (api.$http != null) {
            api.$http.post(_api_url, {
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
        }
        else {
            $.ajax({
                type: "POST",
                url: _api_url,
                crossDomain: true,
                dataType: 'jsonp',
                success: function (e) {
                    try {
                        var result = JSON.parse(e);
                        try {
                            var resultCode = result[APIField.result_code];
                            var data = result[APIField.data];
                            success(resultCode, data);
                        }
                        catch (exception) {
                            comm.log("failed to process api result");
                            comm.log(exception);
                            comm.log(e);
                        }
                    }
                    catch (exception) {
                        comm.log("failed to parse json from api result");
                        comm.log(exception);
                        comm.log(e);
                    }
                }
            }).error(function (result) {
                comm.log(failMessage);
                comm.log(result);
            });
        }
    }
    api.api_call = api_call;
    function get_all_row(table_name, callback) {
        var data = {};
        data[APIField.table_name] = table_name;
        api_call(_api_GetTableRowList, data, callback);
    }
    api.get_all_row = get_all_row;
    function set_all_row(table_name, rows) {
    }
    api.set_all_row = set_all_row;
})(api || (api = {}));
var task;
(function (task_1) {
    var TaskQueue = (function () {
        function TaskQueue(taskQueue) {
            if (taskQueue === void 0) { taskQueue = []; }
            this.taskQueue = taskQueue;
        }
        TaskQueue.prototype.startTasks = function () {
            while (this.hasNextTask()) {
                var task = this.nextTask();
                task();
            }
        };
        TaskQueue.prototype.addTask = function (task) {
            this.taskQueue.push(task);
        };
        TaskQueue.prototype.hasNextTask = function () {
            return this.taskQueue.length > 0;
        };
        TaskQueue.prototype.nextTask = function () {
            if (this.hasNextTask()) {
                return this.taskQueue.shift();
            }
            else {
                throw new NoNextTaskError();
            }
        };
        return TaskQueue;
    })();
    task_1.TaskQueue = TaskQueue;
    var TaskError = (function (_super) {
        __extends(TaskError, _super);
        function TaskError(message) {
            _super.call(this, message);
            this.message = message;
            this.name = "TaskError";
        }
        return TaskError;
    })(Error);
    var NoNextTaskError = (function (_super) {
        __extends(NoNextTaskError, _super);
        function NoNextTaskError() {
            _super.apply(this, arguments);
            this.name = "NoNextTaskError";
        }
        return NoNextTaskError;
    })(TaskError);
})(task || (task = {}));
function main_init() {
    comm.log("stub_test:start");
    var id = "98765432";
    var password = "123456";
    social_connection.asynchronous_logic.login(id, password);
    comm.log("stub_test:end");
}
//# sourceMappingURL=main.js.map