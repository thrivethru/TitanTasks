import { addRelativeDates } from "../shared/utils.js";

export class TaskManager {
  constructor(currentId = 0, storage = window.localStorage) {
    this.tasks = [];
    this.currentId = currentId;
    this.storage = storage;
    this.filter = "all";
    this.dateFilter = "any";
  }

  getTasks() {
    return addRelativeDates([...this.tasks], "dueDate");
  }

  getTodoTasks() {
    return this.getTasks().filter((task) => task.status === "ToDo");
  }

  getDoneTasks() {
    return this.getTasks().filter((task) => task.status === "Done");
  }

  setFilter(filter) {
    this.filter = filter;
    this.save();
  }

  getFilter() {
    return this.filter;
  }

  setDateFilter(dateFilter) {
    this.dateFilter = dateFilter;
    this.save();
  }

  getDateFilter() {
    return this.dateFilter;
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
    this.save();
  }

  setStatus(taskId) {
    this.tasks = this.tasks.map((task) => {
      if (taskId !== task.id) return task;
      return { ...task, status: task.status === "ToDo" ? "Done" : "ToDo" };
    });
    this.save();
  }

  setDate(taskId, newDueDate) {
    this.tasks = this.tasks.map((task) => {
      if (taskId !== task.id) return task;
      return { ...task, dueDate: newDueDate };
    });
    this.tasks.sort((a, b) => a.dueDate - b.dueDate);
    this.save();
  }

  setAssignedTo(taskId, newAssignedTo) {
    this.tasks = this.tasks.map((task) => {
      if (taskId !== task.id) return task;
      return { ...task, assignedTo: newAssignedTo };
    });
    this.save();
  }

  load() {
    let tasks = this.storage.getItem("tasks");
    if (tasks && tasks.length > 0) {
      tasks = JSON.parse(tasks);
      this.tasks = tasks.map((task) => {
        return { ...task, dueDate: new Date(task.dueDate) };
      });
    }
    const currentId = this.storage.getItem("currentId");
    if (currentId) {
      this.currentId = parseInt(currentId);
    }
    const filter = this.storage.getItem("filter");
    this.filter = ["todo", "done"].includes(filter) ? filter : "all";
    const dateFilter = this.storage.getItem("dateFilter");
    this.dateFilter = [
      "any",
      "past",
      "today",
      "tomorrow",
      "next-seven-days",
    ].includes(dateFilter)
      ? dateFilter
      : "any";
  }

  save() {
    const tasksJson = JSON.stringify(this.tasks);
    this.storage.setItem("tasks", tasksJson);
    const currentId = this.currentId.toString();
    this.storage.setItem("currentId", currentId);
    if (this.filter) this.storage.setItem("filter", this.filter);
    if (this.dateFilter) this.storage.setItem("dateFilter", this.dateFilter);
  }

  delete(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.save();
  }
}
