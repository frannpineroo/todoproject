interface Task {
    id: number;
    title: string;
    completed: boolean;
}

class TaskManager {
    tasks: Task[] = [];

    constructor() {
        this.loadTasks();
    }

    loadTasks(): void {
        const storedTasks = localStorage.getItem("tasks");
        if (storedTasks) {
            this.tasks = JSON.parse(storedTasks);
        }
        this.renderTasks();
    }

    addTask(title: string): void {
        const newTask: Task = {
            id: Date.now(),
            title,
            completed: false
        };
        this.tasks.push(newTask);
        this.saveTasks();
    }

    toggleTask(id: number): void {
        let task: Task | undefined;
        for (const t of this.tasks) {
            if (t.id === id) {
                task = t;
                break;
            }
        }
    }

    removeTask(id: number): void {
        const taskElement = document.querySelector(`[data-id="${id}"]`);

        if (taskElement) {
        taskElement.classList.add("remove-animation");

        console.log("Animación iniciada para la tarea:", id); // Verificar en la consola

        taskElement.addEventListener("animationend", () => {
            console.log("Animación terminada para la tarea:", id); // Verificar en la consola
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            taskElement.remove();
        });
    }
    }

    saveTasks(): void {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
        this.renderTasks();
    }

    renderTasks(): void {
        const taskList = document.getElementById("task-list");
        if (!taskList) return;

        taskList.innerHTML = "";
        this.tasks.forEach(task => {
            const li = document.createElement("li");
            li.setAttribute("data-id", task.id.toString());
            li.innerHTML = `
                <input type="checkbox" ${task.completed ? "checked" : ""} onclick="taskManager.toggleTask(${task.id})">
                ${task.title}
                <button onclick="taskManager.removeTask(${task.id})">❌</button>
            `;
            taskList.appendChild(li);
        });
    }
}
const taskManager = new TaskManager();