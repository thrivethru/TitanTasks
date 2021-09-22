const taskListFilterStatusView = `
<input
  type="radio"
  class="btn-check"
  name="task-list-filter-status"
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
  name="task-list-filter-status"
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
  name="task-list-filter-status"
  id="task-list-radio-done"
  value="done"
  autocomplete="off"
/>
<label class="btn btn-outline-primary" for="task-list-radio-done"
  >Done</label
>`;

const taskListFilterDateView = `
<input
  type="radio"
  class="btn-check"
  name="task-list-filter-date"
  id="task-list-radio-any"
  value="any"
  autocomplete="off"
/>
<label class="btn btn-outline-secondary" for="task-list-radio-any"
  >Any</label
>
<input
  type="radio"
  class="btn-check"
  name="task-list-filter-date"
  id="task-list-radio-past"
  value="past"
  autocomplete="off"
/>
<label class="btn btn-outline-secondary" for="task-list-radio-past"
  >Past</label
>
<input
  type="radio"
  class="btn-check"
  name="task-list-filter-date"
  id="task-list-radio-today"
  value="today"
  autocomplete="off"
/>
<label class="btn btn-outline-secondary" for="task-list-radio-today"
  >Today</label
>
<input
  type="radio"
  class="btn-check"
  name="task-list-filter-date"
  id="task-list-radio-tomorrow"
  value="tomorrow"
  autocomplete="off"
/>
<label class="btn btn-outline-secondary" for="task-list-radio-tomorrow"
  >Tomorrow</label
>
<input
  type="radio"
  class="btn-check"
  name="task-list-filter-date"
  id="task-list-radio-next-seven-days"
  value="next-seven-days"
  autocomplete="off"
/>
<label class="btn btn-outline-secondary" for="task-list-radio-next-seven-days"
  >Next 7 Days</label
>`;

export class TaskListFilter {
  constructor(taskManager, taskList) {
    this.taskManager = taskManager;
    this.taskList = taskList;
    this.taskListFilterStatus = document.querySelector(
      "#task-list-filter-status"
    );
    this.taskListFilterDate = document.querySelector("#task-list-filter-date");
    this.filter = this.taskManager.getFilter() || "all";
    this.dateFilter = this.taskManager.getDateFilter() || "any";
  }

  init() {
    this.taskListFilterStatus.innerHTML = taskListFilterStatusView;
    const filterQuery = `input[value="${this.filter}"]`;
    this.taskListFilterStatus
      .querySelector(filterQuery)
      .setAttribute("checked", "");
    this.taskListFilterDate.innerHTML = taskListFilterDateView;
    const filterDateQuery = `input[value="${this.dateFilter}"]`;
    this.taskListFilterDate
      .querySelector(filterDateQuery)
      .setAttribute("checked", "");

    this.taskListFilterStatus.addEventListener(
      "change",
      (event) => {
        const checked = event.target.value;
        if (checked !== this.filter) {
          this.taskManager.setFilter(checked);
          this.filter = checked;
          this.taskList.render();
        }
      },
      false
    );

    this.taskListFilterDate.addEventListener(
      "change",
      (event) => {
        const checked = event.target.value;
        if (checked !== this.dateFilter) {
          this.taskManager.setDateFilter(checked);
          this.dateFilter = checked;
          this.taskList.render();
        }
      },
      false
    );
  }
}
