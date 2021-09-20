import { validateDateInput } from "../shared/utils.js";

const newTaskFormView = `
<form id="task-form" class="new-task-form" novalidate>
  <label for="task-form-name">Name</label>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      id="task-form-name"
      placeholder="Enter task name"
      required
    />
    <!-- <div class="valid-feedback">Looks good!</div> -->
    <div class="invalid-feedback">Name not valid</div>
  </div>
  <div class="form-group">
    <label for="task-form-description">Description</label>
    <textarea
      type="textarea"
      class="form-control"
      id="task-form-description"
      placeholder="Enter task description"
    ></textarea>
    <!-- <div class="valid-feedback">Looks good!</div> -->
    <div class="invalid-feedback">Description not valid</div>
  </div>
  <div class="row row-cols-2 mb-3">
    <div class="form-group">
      <label for="task-form-duedate">Due Date</label>
      <input
        type="date"
        class="form-control"
        id="task-form-duedate"
        placeholder="Select due date"
        required
      />
      <!-- <div class="valid-feedback">Looks good!</div> -->
      <div class="invalid-feedback">Due Date not valid</div>
    </div>
    <div class="form-group">
      <label for="task-form-assigned">Assigned to</label>
      <div class="input-group">
        <span class="input-group-text">@</span>
        <select
          class="form-select"
          id="task-form-assigned"
          name="assigned"
          required
        >
          <option value="Unassigned">Unassigned</option>
          <option value="Mark">Mark</option>
          <option value="Kassahun">Kassahun</option>
          <option value="Jeriah">Jeriah</option>
          <option value="Radha">Radha</option>
        </select>
        <!-- <div class="valid-feedback">Looks good!</div> -->
        <div class="invalid-feedback">Assignment not valid</div>
      </div>
    </div>
  </div>
  <button class="btn btn-primary" type="submit">
    <i class="bi bi-plus-lg"></i> Add Task
  </button>
  <button
    id="task-form-clear"
    class="btn btn-secondary float-end"
    type="button"
  >
    <i class="bi bi-eraser"></i> Clear
  </button>
</form>`;

export class TaskForm {
  constructor(taskManager, tasksList) {
    this.taskManager = taskManager;
    this.tasksList = tasksList;
    this.newTaskView = document.querySelector("#new-task-form");
    this.newTaskForm;
    this.taskFormDueDate;
    this.newTaskFormClear;
  }

  init() {
    this.newTaskView.innerHTML = newTaskFormView;
    this.newTaskForm = this.newTaskView.querySelector("#task-form");
    this.taskFormDueDate = this.newTaskView.querySelector("#task-form-duedate");
    this.newTaskFormClear = this.newTaskView.querySelector("#task-form-clear");

    this.newTaskForm.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.newTaskForm.classList.add("was-validated");
        this.processNewTask();
      },
      false
    );

    this.newTaskFormClear.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.resetTaskForm();
      },
      false
    );
  }

  validFormFieldInput(newTaskInput) {
    const { name, assignedTo, dueDate } = newTaskInput;
    let valid = true;
    if (name.length < 1) {
      valid = false;
    }
    if (assignedTo.length < 1) {
      valid = false;
    }
    if (!validateDateInput(dueDate)) {
      valid = false;
      this.taskFormDueDate.setCustomValidity("customError");
    } else {
      this.taskFormDueDate.setCustomValidity("");
    }
    return valid;
  }

  processNewTask() {
    const newTaskInput = {
      name: this.newTaskForm.querySelector("#task-form-name").value,
      description: this.newTaskForm.querySelector("#task-form-description")
        .value,
      dueDate: this.newTaskForm.querySelector("#task-form-duedate").value,
      assignedTo: this.newTaskForm.querySelector("#task-form-assigned").value,
    };

    if (this.validFormFieldInput(newTaskInput)) {
      const { name, description, assignedTo, dueDate } = newTaskInput;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      this.tasksList.render();
      this.taskManager.save();
      this.resetTaskForm();
    }
  }

  resetTaskForm() {
    this.newTaskForm.reset();
    this.newTaskForm.classList.remove("was-validated");
  }
}
