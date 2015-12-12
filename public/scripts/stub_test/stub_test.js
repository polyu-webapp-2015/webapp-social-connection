///<reference path="../../js/enum/APIFieldEnum.ts"/>
///<reference path="../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../../js/api_list.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function stub_test_init() {
    comm.log("stub_test:start");
    var id = "98765432";
    var password = "123456";
    social_connection.asynchronous_logic.login(id, password);
    comm.log("stub_test:end");
}
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
        ui.onLogin = function (resultCode, data) {
            if (resultCode = ResultCode.Success) {
                comm.log("login success");
                var sessionId = data[APIField.session_id];
                comm.log("the session id is " + sessionId);
                config.save_login(sessionId);
                asynchronous_logic.getAllDiscussBoard();
            }
            else {
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
        function onDiscussBoardsReceivedfunction(discussboards) {
            comm.log("received " + discussboards.length + " discussion board");
        }
        ui.onDiscussBoardsReceivedfunction = onDiscussBoardsReceivedfunction;
        function onProfilesReceivedfunction(profiles) {
            comm.log("received " + profiles.length + " profile");
            comm.log(profiles);
            profiles.forEach(function (profile) {
                comm.log(profile.toString());
            });
            //for(var  profile in profiles){
            //  comm.log(profile.toString());
            //}
        }
        ui.onProfilesReceivedfunction = onProfilesReceivedfunction;
    })(ui || (ui = {}));
    var model;
    (function (model) {
        var Profile = (function () {
            function Profile(firstName, lastName) {
                this.first_name = firstName;
                this.last_name = lastName;
            }
            Profile.prototype.toString = function () {
                return this.first_name + " " + this.last_name;
            };
            Profile.parse_list = function (resultCode, data) {
                if (resultCode != ResultCode.Success)
                    throw debug.IllegalStatusError;
                var profile_raws = data[APIField.element_array];
                var profile_list = profile_raws.map(function (raw) {
                    //return new Profile(raw[stub.User_stub.__first_name()], raw[stub.User_stub.__last_name()]);
                    return new Profile(raw["first_name"], raw["last_name"]);
                });
                return profile_list;
            };
            return Profile;
        })();
        model.Profile = Profile;
        var DiscussBoard = (function () {
            function DiscussBoard(desc) {
                this.desc = desc;
            }
            DiscussBoard.parse_list = function (resultCode, data) {
                comm.log("parsing discuss board list");
                //TODO
                var list = [];
                list.push(new DiscussBoard("123"));
                return list;
            };
            return DiscussBoard;
        })();
        model.DiscussBoard = DiscussBoard;
    })(model = social_connection.model || (social_connection.model = {}));
    var asynchronous_logic;
    (function (asynchronous_logic) {
        //TODO test import DiscussBoard_stub = stub.DiscussBoard_stub;
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
        function getAllDiscussBoard() {
            comm.log("try to get all discuss board");
            var data = {};
            data[APIField.id_array] = [];
            api.api_call(_api_GetProfileList, data, model.Profile.parse_list);
        }
        asynchronous_logic.getAllDiscussBoard = getAllDiscussBoard;
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
    var indentText = "  ";
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
        api.$http.post(_api_url, {
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
    api.api_call = api_call;
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
//# sourceMappingURL=stub_test.js.map