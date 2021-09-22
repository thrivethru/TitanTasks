import { validateDateInput, sanitizeHTML } from "../shared/utils.js";

export const createTaskView = (
  id,
  name,
  description,
  assignedTo,
  dueDate,
  status,
  relativeDates
) => {
  const html = `
  <div data-task-id="${id}" class="card task-card ${relativeDates.join(" ")}">
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
            <div class="col">${
              status === "Done"
                ? ""
                : relativeDates.includes("past")
                ? "<div class='badge bg-danger'>Past Due</div>"
                : relativeDates.includes("today")
                ? "<div class='badge bg-warning text-dark'>Today</div>"
                : relativeDates.includes("tomorrow")
                ? "<div class='badge bg-info'>Tomorrow</div>"
                : ""
            }</div>
            <div class="col me-auto">
              <button class="done-button float-end badge ${
                status === "Done" ? "btn-success" : "btn-primary"
              } rounded-pill" data-bs-toggle="tooltip" title="${
    status === "Done" ? "Mark as ToDo" : "Mark as Done"
  }">${status}</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">${sanitizeHTML(name)}</h5>
          <p class="card-text">${sanitizeHTML(description)}</p>
        </div>     
        <div class="container">
          <div class="row align-items-center text-muted">
            <div class="col-auto">
              <label class="visually-hidden" for="task-list-duedate">Due Date</label>
              <div class="input-group align-items-center">
                <small class="me-2">Due:</small>
                <input type="date" class="form-control form-control-plaintext form-control-sm text-muted task-card-date" id="task-card-duedate" value="${dueDate}">
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

export class TaskCard {
  constructor(taskManager, taskList) {
    this.taskManager = taskManager;
    this.taskList = taskList;
  }

  updateStatus(event) {
    const parentTask = event.target.parentNode.parentNode.parentNode.parentNode;
    const taskId = parseInt(parentTask.dataset.taskId);
    this.taskManager.setStatus(taskId);
    this.taskList.render();
  }

  updateDate(event) {
    const inputDate = event.target.value;
    const parentTask =
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    const taskId = parseInt(parentTask.dataset.taskId);
    if (validateDateInput(inputDate)) {
      const newDueDate = new Date(inputDate);
      newDueDate.setTime(
        newDueDate.getTime() + newDueDate.getTimezoneOffset() * 60000
      );
      this.taskManager.setDate(taskId, newDueDate);
    } else {
      // TODO show validation
    }
    this.taskList.render();
  }

  updateAssignedTo(event) {
    const inputAssingedTo = event.target.value;
    const parentTask =
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
    const taskId = parseInt(parentTask.dataset.taskId);
    this.taskManager.setAssignedTo(taskId, inputAssingedTo);
    this.taskList.render();
  }

  deleteTask(event) {
    let parentTask = event.target.parentNode.parentNode.parentNode.parentNode;
    if (event.target.classList.contains("delete-button-icon")) {
      parentTask = parentTask.parentNode;
    }
    const taskId = parseInt(parentTask.dataset.taskId);
    this.taskManager.delete(taskId);
    this.taskList.render();
  }
}
