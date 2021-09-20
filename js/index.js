import { TaskManager } from "./core/task.service.js";
import { TaskForm } from "./task-form/task-form.component.js";
import { TasksList } from "./tasks-list/tasks-list.component.js";

const taskManager = new TaskManager();
const tasksList = new TasksList(taskManager);
const taskForm = new TaskForm(taskManager, tasksList);

taskManager.load();
taskForm.init();
tasksList.init();
tasksList.render();
