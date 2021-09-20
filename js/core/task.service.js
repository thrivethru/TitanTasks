export class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
    this.filter = "all";
  }

  getTasks() {
    return [...this.tasks];
  }

  getTodoTasks() {
    return this.tasks.filter((task) => task.status === "ToDo");
  }

  getDoneTasks() {
    return this.tasks.filter((task) => task.status === "Done");
  }

  setFilter(filter) {
    this.filter = filter;
  }

  getFilter() {
    return this.filter;
  }

  addTask(name, description, assignedTo, dueDate) {
    this.currentId++;
    const newDueDate = new Date(dueDate);
    newDueDate.setTime(
      newDueDate.getTime() + newDueDate.getTimezoneOffset() * 60000
    );
    let newTask = {
      id: this.currentId,
      name,
      description,
      assignedTo,
      dueDate: newDueDate,
      status: "ToDo",
    };
    this.tasks = [...this.tasks, newTask];
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
  }

  setStatus(taskId) {
    this.tasks = this.tasks.map((task) => {
      if (taskId !== task.id) return task;
      return { ...task, status: task.status === "ToDo" ? "Done" : "ToDo" };
    });
  }

  setDate(taskId, newDueDate) {
    this.tasks = this.tasks.map((task) => {
      if (taskId !== task.id) return task;
      return { ...task, dueDate: newDueDate };
    });
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
  }

  setAssignedTo(taskId, newAssignedTo) {
    this.tasks = this.tasks.map((task) => {
      if (taskId !== task.id) return task;
      return { ...task, assignedTo: newAssignedTo };
    });
  }

  load() {
    let tasks = localStorage.getItem("tasks");
    if (tasks && tasks.length > 0) {
      tasks = JSON.parse(tasks);
      this.tasks = tasks.map((task) => {
        return { ...task, dueDate: new Date(task.dueDate) };
      });
    }
    let currentId = localStorage.getItem("currentId");
    if (currentId) {
      this.currentId = parseInt(currentId);
    }
    let filter = localStorage.getItem("filter");
    if (filter) {
      this.filter = filter;
    }
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
  }
}
