import { assert, expect } from "chai";
import { TaskManager } from "../js/task.service.js";

const mockNewTask = {
  name: "Go to the store.",
  description: "buy supplies for Final Project party.",
  assignedTo: "Kassahun",
  dueDate: "2021-09-21"
}
describe('TaskManager', function() {
  describe("Constructor", function() {
    before(function() {
      //Will run before all tests in this block
      this.taskManager = new TaskManager();
    });
    after(function() {
      //Will run after all tests in this block
      delete this.taskManager;
    });
    it("taskManager should exist", function() {
      expect(this.taskManager).to.exist;
    });
    it("should have tasks of type array", function() {
      expect(this.taskManager.getTasks()).to.be.a('array');
    });
    it("should have empty tasks", function() {
      expect(this.taskManager.getTasks()).to.be.empty;
    });
    // it("should have positive fuel", function() {
    //   expect(this.car.getFuel()).to.equal(16);                                                                                 
    // });
    // it("should throw Error if getColor is called without being set", function() {
    //   // Note that here we are passing function directly to expect
    //   expect(this.car.getColor).to.throw(Error);
    // });
    // it("should return a color if set", function() {
    //   var color = "Red";
    //   this.car.setColor("Red");
    //   expect(this.car.getColor()).to.be.a("string");
    //   expect(this.car.getColor()).to.equal(color);
    // });
  });
  describe("addTask()", function() {
    beforeEach(function() {
      //Will run before each test in this block
      this.taskManager = new TaskManager();
    });
    afterEach(function() {
      //Will run after each test in this block
      delete this.taskManager;
    });
    it('should add an element to tasks', function() {
      this.taskManager.addTask(mockNewTask);
      expect(this.taskManager.getTasks()).to.have.lengthOf(1);
    });
    it('should have all keys', function() {
      this.taskManager.addTask(mockNewTask);
      expect(this.taskManager.getTasks()[0]).to.have.all.keys('id', 'name', 'description', 'assignedTo', 'dueDate','status');
    });
    it('should have all keys', function() {
      this.taskManager.addTask(mockNewTask);
      expect(this.taskManager.getTasks()[0]).to.have.all.keys('id', 'name', 'description', 'assignedTo', 'dueDate','status');
    });
    it('should have id equal 1', function() {
      this.taskManager.addTask(mockNewTask);
      const taskId = this.taskManager.getTasks()[0].id;
      expect(taskId).to.equal(1);
    });
    it(`should have name equal to ${mockNewTask.name}`, function() {
      this.taskManager.addTask(mockNewTask);
      console.log(this.taskManager.getTasks()[0].name);
      console.log(this.taskManager.getTasks()[0]);
      const taskName = this.taskManager.getTasks()[0].name;
      expect(taskName).to.equal(mockNewTask.name);
    });
  });  
});
