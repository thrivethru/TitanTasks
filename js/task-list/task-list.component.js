import { createTaskView, TaskCard } from "./task-card.component.js";
import { TaskListFilter } from "./task-list-filter.component.js";

export class TaskList {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.taskList = document.querySelector("#task-list");
    this.taskCard;
  }

  init() {
    const taskListFilter = new TaskListFilter(this.taskManager, this);
    taskListFilter.init();
    this.taskCard = new TaskCard(this.taskManager, this);

    this.taskList.addEventListener(
      "click",
      (event) => {
        if (event.target.classList.contains("done-button")) {
          this.taskCard.updateStatus(event);
        }
        if (event.target.classList.contains("delete-button")) {
          this.taskCard.deleteTask(event);
        }
      },
      false
    );

    this.taskList.addEventListener(
      "change",
      (event) => {
        if (event.target.classList.contains("task-card-date")) {
          this.taskCard.updateDate(event);
        }
        if (event.target.classList.contains("task-card-assign")) {
          this.taskCard.updateAssignedTo(event);
        }
      },
      false
    );

    const reRender = setInterval(() => this.render(), 60000);
  }

  getFilteredTasks() {
    const statusFilter = this.taskManager.getFilter();
    const dateFilter = this.taskManager.getDateFilter();
    let filteredTasks;
    switch (statusFilter) {
      case "todo":
        filteredTasks = this.taskManager.getTodoTasks();
        break;
      case "done":
        filteredTasks = this.taskManager.getDoneTasks();
        break;
      default:
        filteredTasks = this.taskManager.getTasks();
    }
    filteredTasks =
      dateFilter === "any"
        ? filteredTasks
        : filteredTasks.filter((task) =>
            task.relativeDates.includes(dateFilter)
          );
    return filteredTasks;
  }

  render() {
    let filteredTasks = this.getFilteredTasks();
    let tasksHtmlList = [];
    filteredTasks.forEach((task) => {
      const inputDueDate = `${task.dueDate.getFullYear()}-${(
        task.dueDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${task.dueDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const taskHtml = createTaskView(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        inputDueDate,
        task.status,
        task.relativeDates
      );
      tasksHtmlList = [...tasksHtmlList, taskHtml];
    });
    const tasksHtml = tasksHtmlList.join("\n");
    this.taskList.innerHTML = tasksHtml;
  }
}
