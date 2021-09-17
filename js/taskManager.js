export const createTaskHtml = (
  id,
  name,
  description,
  assignedTo,
  dueDate,
  status
) => {
  const html = `
  <div data-task-id="${id}" class="card task-card">
        <div class="card-header">
          <div class="row align-items-center">
            <div class="col-auto">
              <div class="input-group input-group-sm align-items-center">
                <span class="fw-bold">@</span>
                <select class="task-card-assign form-control form-control-plaintext ps-0 fw-bold" id="task-card-assigned" name="assigned">
                  <option selected value="${assignedTo}">${assignedTo}</option>
                  <option value="Unassigned">Unassigned</option>
                  <option value="Kassahun">Kassahun</option>
                  <option value="Mark">Mark</option>
                  <option value="Jsmooth">Jsmooth</option>
                  <option value="Radha">Radha</option>
                </select>
              </div>
            </div>
            <div class="col me-auto">
              <button class="done-button float-end badge ${
                status === "Done" ? "btn-success" : "btn-warning text-dark"
              } rounded-pill" data-bs-toggle="tooltip" title="${
    status === "Done" ? "Mark as ToDo" : "Mark as Done"
  }">${status}</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <p class="card-text">${description}</p>
        </div>     
        <div class="container">
          <div class="row align-items-center text-muted">
            <div class="col-auto">
              <label class="visually-hidden" for="task-list-duedate">Due Date</label>
              <div class="input-group align-items-center">
                <span class="me-2">Due:</span>
                <input type="date" class="form-control form-control-plaintext task-card-date" id="task-card-duedate" value="${dueDate}">
              </div>
            </div>
            <div class="col me-auto">
              <button type="button" class="delete-button btn btn-sm btn-outline-secondary float-end border-0" data-bs-toggle="tooltip" title="Delete Task"><i class="delete-button delete-button-icon bi bi-trash"></i></button>
            </div>
          </div>
        </div>
      </div>
  `;
  return html;
};

export class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
    this.filter = "all";
    this.todoList = [];
    this.doneList = [];
  }

  setFilter(filter) {
    this.filter = filter;
  }

  getFilter() {
    return this.filter;
  }

  addTask(name, description, assignedTo, dueDate) {
    this.currentId++;
    let newTask = {
      id: this.currentId,
      name,
      description,
      assignedTo,
      dueDate,
      status: "ToDo",
    };
    this.tasks = [...this.tasks, newTask];
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
    this.getDoneTasks();
    this.getTodoTasks();
  }

  getTaskById(taskId) {
    let foundTask;
    this.tasks.forEach((task) => {
      if (task.id === taskId) {
        foundTask = task;
      }
    });
    return foundTask;
  }

  setStatus(taskId) {
    const task = this.getTaskById(taskId);
    task.status = task.status === "ToDo" ? "Done" : "ToDo";
    this.getDoneTasks();
    this.getTodoTasks();
  }

  setDate(taskId, newDueDate) {
    const task = this.getTaskById(taskId);
    task.dueDate = newDueDate;
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
    this.getDoneTasks();
    this.getTodoTasks();
  }

  setAssignedTo(taskId, newAssignedTo) {
    const task = this.getTaskById(taskId);
    task.assignedTo = newAssignedTo;
  }

  getTodoTasks() {
    this.todoList = this.tasks.filter((task) => task.status === "ToDo");
  }

  getDoneTasks() {
    this.doneList = this.tasks.filter((task) => task.status === "Done");
  }

  load() {
    let tasks = localStorage.getItem("tasks");
    if (tasks && tasks.length > 0) {
      tasks = JSON.parse(tasks);
      tasks.forEach((task) => {
        task.dueDate = new Date(task.dueDate);
      });
      this.tasks = tasks;
    }
    let currentId = localStorage.getItem("currentId");
    if (currentId) {
      this.currentId = parseInt(currentId);
    }
    let filter = localStorage.getItem("filter");
    if (filter) {
      this.filter = filter;
    }
    this.getDoneTasks();
    this.getTodoTasks();
  }

  save() {
    let tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    let currentId = this.currentId.toString();
    localStorage.setItem("currentId", currentId);
    localStorage.setItem("filter", this.filter);
  }

  delete(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.getDoneTasks();
    this.getTodoTasks();
  }

  render() {
    const filter = this.filter;
    let filteredTasks = this.tasks;
    switch (filter) {
      case "todo":
        filteredTasks = this.todoList;
        break;
      case "done":
        filteredTasks = this.doneList;
        break;
      default:
        filteredTasks = this.tasks;
    }
    let tasksHtmlList = [];
    filteredTasks.forEach((task) => {
      // let options = {
      //   year: "numeric",
      //   month: "numeric",
      //   day: "numeric",
      // };
      // const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      //   task.dueDate
      // );
      const inputDueDate = `${task.dueDate.getFullYear()}-${(
        task.dueDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${task.dueDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        inputDueDate,
        //formattedDate,
        task.status
      );
      tasksHtmlList = [...tasksHtmlList, taskHtml];
    });
    const tasksHtml = tasksHtmlList.join("\n");
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }
}
