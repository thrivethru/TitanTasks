import { createTaskView, TaskCard } from "./task-card.component.js";
import { TasksListFilter } from "./tasks-list-filter.component.js";

export class TasksList {
  constructor(taskManager) {
    this.taskManager = taskManager;
    this.tasksList = document.querySelector("#tasks-list");
    this.taskCard;
  }

  init() {
    const tasksListFilter = new TasksListFilter(this.taskManager, this);
    tasksListFilter.init();
    this.taskCard = new TaskCard(this.taskManager, this);

    this.tasksList.addEventListener(
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

    this.tasksList.addEventListener(
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
  }

  render() {
    const filter = this.taskManager.getFilter();
    let filteredTasks;
    switch (filter) {
      case "todo":
        filteredTasks = this.taskManager.getTodoTasks();
        break;
      case "done":
        filteredTasks = this.taskManager.getDoneTasks();
        break;
      default:
        filteredTasks = this.taskManager.getTasks();
    }
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
        task.status
      );
      tasksHtmlList = [...tasksHtmlList, taskHtml];
    });
    const tasksHtml = tasksHtmlList.join("\n");
    this.tasksList.innerHTML = tasksHtml;
  }
}
