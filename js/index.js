import { TaskManager } from "./taskManager.js";

const taskManager = new TaskManager();
const newTaskForm = document.querySelector("#task-form");
const newTaskFormClear = document.querySelector("#task-form-clear");
const tasksListFilter = document.querySelector("#task-list-radio-group");
const tasksList = document.querySelector("#task-list");
const taskFormDueDate = document.querySelector("#task-form-duedate");

taskManager.load();
const initialFilter = taskManager.getFilter();
const filterQuery = `input[value="${initialFilter}"]`;
tasksListFilter.querySelector(filterQuery).setAttribute("checked", "");
taskManager.render();

function validFormFieldInput(newTaskInput) {
  let { name, assignedTo, dueDate } = newTaskInput;
  let valid = true;
  if (name.length < 1) {
    valid = false;
  }
  if (assignedTo.length < 1) {
    valid = false;
  }
  if (!validateDate(dueDate)) {
    valid = false;
    taskFormDueDate.setCustomValidity("customError");
  } else {
    taskFormDueDate.setCustomValidity("");
  }
  return valid;
}

function validateDate(dueDate) {
  let valid = true;
  if (!dueDate) {
    valid = false;
  }
  try {
    let date = new Date(dueDate);
    date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    const today = new Date(Date.now());
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    let year2100 = 4102444800000;
    if (today > date || date >= year2100) {
      valid = false;
    }
  } catch (error) {
    // console.log(error);
    valid = false;
  }
  return valid;
}

function processNewTask() {
  const newTaskInput = {
    name: document.querySelector("#task-form-name").value,
    description: document.querySelector("#task-form-description").value,
    dueDate: document.querySelector("#task-form-duedate").value,
    assignedTo: document.querySelector("#task-form-assigned").value,
  };

  if (validFormFieldInput(newTaskInput)) {
    const dueDate = new Date(newTaskInput.dueDate);
    dueDate.setTime(dueDate.getTime() + dueDate.getTimezoneOffset() * 60000);
    taskManager.addTask(
      newTaskInput.name,
      newTaskInput.description,
      newTaskInput.assignedTo,
      dueDate
    );
    taskManager.render();
    taskManager.save();
    resetTaskForm();
  }
}

function updateStatus(event) {
  const parentTask = event.target.parentNode.parentNode.parentNode.parentNode;
  const taskId = parseInt(parentTask.dataset.taskId);
  taskManager.setStatus(taskId);
  taskManager.render();
  taskManager.save();
}

function updateDate(event) {
  const inputDate = event.target.value;
  const parentTask =
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  const taskId = parseInt(parentTask.dataset.taskId);
  if (validateDate(inputDate)) {
    const newDueDate = new Date(inputDate);
    newDueDate.setTime(
      newDueDate.getTime() + newDueDate.getTimezoneOffset() * 60000
    );
    taskManager.setDate(taskId, newDueDate);
    taskManager.save();
  } else {
    // TODO show validation
  }
  taskManager.render();
}

function updateAssignedTo(event) {
  const inputAssingedTo = event.target.value;
  const parentTask =
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode;
  const taskId = parseInt(parentTask.dataset.taskId);
  taskManager.setAssignedTo(taskId, inputAssingedTo);
  taskManager.render();
  taskManager.save();
}

function deleteTask(event) {
  let parentTask = event.target.parentNode.parentNode.parentNode.parentNode;
  if (event.target.classList.contains("delete-button-icon")) {
    parentTask = parentTask.parentNode;
  }
  const taskId = parseInt(parentTask.dataset.taskId);
  taskManager.delete(taskId);
  taskManager.render();
  taskManager.save();
}

function resetTaskForm() {
  newTaskForm.reset();
  newTaskForm.classList.remove("was-validated");
}

newTaskForm.addEventListener(
  "submit",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
    newTaskForm.classList.add("was-validated");
    processNewTask();
  },
  false
);

newTaskFormClear.addEventListener(
  "click",
  (event) => {
    event.preventDefault();
    event.stopPropagation();
    resetTaskForm();
  },
  false
);

tasksListFilter.addEventListener("click", (event) => {
  const checked = event.target.value;
  taskManager.setFilter(checked);
  taskManager.render();
  taskManager.save();
});

tasksList.addEventListener(
  "click",
  (event) => {
    if (event.target.classList.contains("done-button")) {
      updateStatus(event);
    }
    if (event.target.classList.contains("delete-button")) {
      deleteTask(event);
    }
  },
  false
);

tasksList.addEventListener(
  "change",
  (event) => {
    if (event.target.classList.contains("task-card-date")) {
      updateDate(event);
    }
    if (event.target.classList.contains("task-card-assign")) {
      updateAssignedTo(event);
    }
  },
  false
);
