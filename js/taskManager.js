export const createTaskHtml = (
  id,
  name,
  description,
  assignedTo,
  dueDate,
  status
) => {
  const html = `
    <div class="card task-card">
      <div class="card-header">
        @${assignedTo}
        <div class="float-end badge bg-success rounded-pill">${status}</div>
      </div>
      <div class="card-body">
        <h5 class="card-title">${id} ${name}</h5>
        <p class="card-text">${description}</p>
      </div>     
      <div class="card-footer" >
        <span>Due: ${dueDate}</span>
        <div class="float-end">
          <a href="#" class="btn btn-primary btn-sm d-none"><i class="bi bi-check-lg"></i> Complete</a>
          <a href="#" class="btn btn-secondary btn-sm"><i class="bi bi-pencil"></i> Edit</a>
          <a href="#" class="btn btn-danger btn-sm"><i class="bi bi-trash"></i> Delete</a>
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
