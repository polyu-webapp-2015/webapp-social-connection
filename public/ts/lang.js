var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang;
(function (lang) {
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
    })(task = lang.task || (lang.task = {}));
})(lang || (lang = {}));
//# sourceMappingURL=lang.js.map