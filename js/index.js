import {TaskManager} from "./taskManager.js";

const taskManager = new TaskManager();
console.log(taskManager.tasks);

taskManager.addTask( 'Take out the trash',
 'Take out the trash to the front of the house',
 'Nick',
 '2020-09-20'
 )
 taskManager.addTask( 'Cook Dinner',
 'Take out the trash to the front of the house',
 'Nick',
 '2020-09-20'
 )
 console.log(taskManager.tasks);
const newTaskForm = document.querySelector("#task-form");

function validFormFieldInput(data) {
    let valid = true;
    const newTaskNameInput = document.querySelector("#task-form-name");
    const name = newTaskNameInput.value;
    console.log("name: " + name);

    const newTaskDescriptionInput = document.querySelector("#task-form-description");
    const description = newTaskDescriptionInput.value;
    console.log("description: " + description);

    const newTaskDueDateInput = document.querySelector("#task-form-duedate");
    const dueDate = newTaskDueDateInput.value;
    console.log("dueDate: " + dueDate);

    const newTaskAssignedInput = document.querySelector("#task-form-assigned");
    const assigned = newTaskAssignedInput.value;
    console.log("Assigned: " + assigned);

    if (name.length < 1){
        console.log('name is not valid');
        valid = false;
    }
    if (assigned.length < 1){
        console.log('Assigned is not valid');
        valid = false;

    }

    if (!dueDate){
        console.log('Due Date is not valid');
        valid = false;
    }
 
    if (valid) {
        taskManager.addTask(name, description, assigned, dueDate);
        console.log(taskManager.tasks);
        newTaskForm.reset();
        newTaskForm.classList.remove('was-validated');
    } 
}

newTaskForm.addEventListener('submit', (event) => {
    if (!newTaskForm.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }
    newTaskForm.classList.add('was-validated')
    validFormFieldInput()
}, false) 


