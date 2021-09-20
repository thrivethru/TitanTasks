const taskListFilterView = `
<input
  type="radio"
  class="btn-check"
  name="task-list-radio"
  id="task-list-radio-all"
  value="all"
  autocomplete="off"
/>
<label class="btn btn-outline-primary" for="task-list-radio-all"
  >All</label
>
<input
  type="radio"
  class="btn-check"
  name="task-list-radio"
  id="task-list-radio-todo"
  value="todo"
  autocomplete="off"
/>
<label class="btn btn-outline-primary" for="task-list-radio-todo"
  >ToDo</label
>
<input
  type="radio"
  class="btn-check"
  name="task-list-radio"
  id="task-list-radio-done"
  value="done"
  autocomplete="off"
/>
<label class="btn btn-outline-primary" for="task-list-radio-done"
  >Done</label
>`;
export class TasksListFilter {
  constructor(taskManager, tasksList) {
    this.taskManager = taskManager;
    this.tasksList = tasksList;
    this.tasksListFilter = document.querySelector("#task-list-radio-group");
  }

  init() {
    this.tasksListFilter.innerHTML = taskListFilterView;
    const initialFilter = this.taskManager.getFilter();
    const filterQuery = `input[value="${initialFilter}"]`;
    this.tasksListFilter.querySelector(filterQuery).setAttribute("checked", "");

    this.tasksListFilter.addEventListener("click", (event) => {
      const checked = event.target.value;
      this.taskManager.setFilter(checked);
      this.tasksList.render();
      this.taskManager.save();
    });
  }
}
