import { TaskManager } from "./taskManager.js";

const taskManager = new TaskManager();
const newTaskForm = document.querySelector("#task-form");
const newTaskFormClear = document.querySelector("#task-form-clear");
const tasksList = document.querySelector("#task-list");

function validFormFieldInput(newTaskInput) {
  let { name, assignedTo, dueDate } = newTaskInput;
  let valid = true;

  if (name.length < 1) {
    valid = false;
  }
  if (assignedTo.length < 1) {
    valid = false;
  }
  if (!dueDate) {
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
    taskManager.addTask(
      newTaskInput.name,
      newTaskInput.description,
      newTaskInput.assignedTo,
      dueDate
    );
    taskManager.render();
    resetTaskForm();
  }
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

tasksList.addEventListener(
  "click",
  (event) => {
    if (event.target.classList.contains("done-button")) {
      const parentTask = event.target.parentNode.parentNode.parentNode;
      const taskId = parseInt(parentTask.dataset.taskId); 
      const task = taskManager.getTaskById(taskId);
      task.status = "Done";
      taskManager.render();
    }
  },
  false
);