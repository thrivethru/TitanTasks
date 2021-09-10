const newTaskForm = document.querySelector("#task-form");

function validFormFieldInput(data) {

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

    }
    if (assigned.length < 1){
        console.log('Assigned is not valid');


    }

    if (!dueDate){
        console.log('Due Date is not valid');
    }

    if (!newTaskForm.checkValidity()) {
        data.preventDefault()
        data.stopPropagation()
      }

      newTaskForm.classList.add('was-validated')
  

}



newTaskForm.addEventListener('submit', validFormFieldInput)


