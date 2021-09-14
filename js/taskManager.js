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
        @${assignedTo}
        <div class="float-end badge ${
          status === "Done" ? "bg-success" : "bg-warning text-dark"
        } rounded-pill">${status}</div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">${description}</p>
      </div>     
      <div class="card-footer" >
        <span>Due: ${dueDate}</span>
        <div class="float-end">
          <button class="btn btn-primary btn-sm done-button ${
            status === "Done" ? "d-none" : ""
          }"><i class="bi bi-check-lg"></i> Complete</button>
          <button class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i> Edit</button>
          <button class="btn btn-danger btn-sm"><i class="bi bi-trash"></i> Delete</button>
        </div>
      </div>
    </div>`;
  return html;
};

export class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
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
    this.tasks.push(newTask);
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

  render() {
    const tasksHtmlList = [];
    this.tasks.forEach((task) => {
      let options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
        task.dueDate
      );
      const taskHtml = createTaskHtml(
        task.id,
        task.name,
        task.description,
        task.assignedTo,
        formattedDate,
        task.status
      );
      tasksHtmlList.push(taskHtml);
    });
    const tasksHtml = tasksHtmlList.join("\n");
    const tasksList = document.querySelector("#task-list");
    tasksList.innerHTML = tasksHtml;
  }
}
