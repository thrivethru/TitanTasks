import { TaskManager } from "./core/task.service.js";
import { TaskForm } from "./task-form/task-form.component.js";
import { TaskList } from "./task-list/task-list.component.js";

const taskManager = new TaskManager();
const taskList = new TaskList(taskManager);
const taskForm = new TaskForm(taskManager, taskList);

taskManager.load();
taskForm.init();
taskList.init();
taskList.render();
