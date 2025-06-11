var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
        this.loadTasks();
    }
    TaskManager.prototype.loadTasks = function () {
        var storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
        this.renderTasks();
    };
    TaskManager.prototype.addTask = function (title) {
        var newTask = {
            id: Date.now(),
            title: title,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
    };
    TaskManager.prototype.toggleTask = function (id) {
        var task;
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var t = _a[_i];
            if (t.id === id) {
                task = t;
                break;
            }
        }
    };
    TaskManager.prototype.removeTask = function (id) {
        this.tasks = this.tasks.filter(function (t) { return t.id !== id; });
        this.saveTasks();
    };
    TaskManager.prototype.saveTasks = function () {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
    };
    TaskManager.prototype.renderTasks = function () {
        var taskList = document.getElementById("task-list");
        if (!taskList)
            return;
        taskList.innerHTML = "";
        this.tasks.forEach(function (task) {
            var li = document.createElement("li");
            li.innerHTML = "\n                <input type=\"checkbox\" ".concat(task.completed ? "checked" : "", " onclick=\"taskManager.toggleTask(").concat(task.id, ")\">\n                ").concat(task.title, "\n                <button onclick=\"taskManager.removeTask(").concat(task.id, ")\">\u274C</button>\n            ");
            taskList.appendChild(li);
        });
    };
    return TaskManager;
}());
var taskManager = new TaskManager();
