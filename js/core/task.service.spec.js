import { expect } from "chai";
import { TaskManager } from "./task.service.js";

const mockNewTask = {
  name: "Go to the store.",
  description: "buy supplies for Final Project party.",
  assignedTo: "Kassahun",
  dueDate: "2021-09-21",
};

describe("TaskManager", function () {
  describe("Constructor", function () {
    before(function () {
      this.taskManager = new TaskManager();
    });

    after(function () {
      delete this.taskManager;
    });

    it("taskManager should exist", function () {
      expect(this.taskManager).to.exist;
    });

    it("should have tasks of type array", function () {
      expect(this.taskManager.getTasks()).to.be.a("array");
    });

    it("should have empty tasks", function () {
      expect(this.taskManager.getTasks()).to.be.empty;
    });
  });

  describe("addTask()", function () {
    beforeEach(function () {
      this.taskManager = new TaskManager();
    });

    afterEach(function () {
      delete this.taskManager;
    });

    it("should add an element to tasks", function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      expect(this.taskManager.getTasks()).to.have.lengthOf(1);
    });

    it("should have all keys", function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      expect(this.taskManager.getTasks()[0]).to.have.all.keys(
        "id",
        "name",
        "description",
        "assignedTo",
        "dueDate",
        "status"
      );
    });

    it("should have all keys", function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      expect(this.taskManager.getTasks()[0]).to.have.all.keys(
        "id",
        "name",
        "description",
        "assignedTo",
        "dueDate",
        "status"
      );
    });

    it("should have id equal 1", function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskId = this.taskManager.getTasks()[0].id;
      expect(taskId).to.equal(1);
    });

    it(`should have name equal to ${mockNewTask.name}`, function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskName = this.taskManager.getTasks()[0].name;
      expect(taskName).to.equal(mockNewTask.name);
    });

    it(`should have description equal to ${mockNewTask.description}`, function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskDescription = this.taskManager.getTasks()[0].description;
      expect(taskDescription).to.equal(mockNewTask.description);
    });

    it(`should have assignedTo equal to ${mockNewTask.assignedTo}`, function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskAssignedTo = this.taskManager.getTasks()[0].assignedTo;
      expect(taskAssignedTo).to.equal(mockNewTask.assignedTo);
    });

    it(`should have dueDate equal to ${mockNewTask.dueDate}`, function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const mockDueDate = new Date(mockNewTask.dueDate);
      mockDueDate.setTime(
        mockDueDate.getTime() + mockDueDate.getTimezoneOffset() * 60000
      );
      const taskDueDate = this.taskManager.getTasks()[0].dueDate;
      expect(taskDueDate.toString()).to.equal(mockDueDate.toString());
    });

    it(`should have status equal to ToDo`, function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskStatus = this.taskManager.getTasks()[0].status;
      expect(taskStatus).to.equal("ToDo");
    });

    it("should add more than 1 tasks and increment id", function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskId = this.taskManager.getTasks()[1].id;
      expect(this.taskManager.getTasks()).to.have.lengthOf(2);
      expect(taskId).to.equal(2);
    });
  });

  describe("delete()", function () {
    beforeEach(function () {
      this.taskManager = new TaskManager();
    });

    afterEach(function () {
      delete this.taskManager;
    });

    it("should delete task", function () {
      const { name, description, assignedTo, dueDate } = mockNewTask;
      this.taskManager.addTask(name, description, assignedTo, dueDate);
      const taskId = this.taskManager.getTasks()[0].id;
      this.taskManager.delete(taskId);
      expect(this.taskManager.getTasks()).to.be.empty;
    });
  });
});
