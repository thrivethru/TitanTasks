export class TaskManager {
    //currentId = 0;
    constructor(currentId) {
        this.tasks = [];
        this.currentId = currentId ?? 0;
    }

    addTask(name, description, assignedTo, dueDate) {
        this.currentId++;
        let newTask = {
            id: this.currentId,
            name,
            description, 
            assignedTo,
            dueDate,
            status: 'ToDo'
        }
        this.tasks.push(newTask);
    }

    
}
