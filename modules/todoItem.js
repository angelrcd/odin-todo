export default class TodoItem {
  constructor(title, description, priority) {
    this._title = title;
    this._description = description;
    this.priority = priority;
    this.taskList = [];
    this.isComplete = false;
    this.creationDate = new Date();
    this.lastEditDate = null;
  }

  get title() {
    return this._title;
  }

  set title(newTitle) {
    if (newTitle.length === 0) return;
    this._title = newTitle;
  }

  get description() {
    return this._description;
  }

  set description(newDescription) {
    if (newDescription.length === 0) return;
    this._description = newDescription;
  }

  editTodo(newTitle, newDescription, priority) {
    this.title = newTitle;
    this.description = newDescription;
    this.priority = priority;
    this.lastEditDate = new Date();
  }

  getTaskList() {
    return this.taskList;
  }

  addTask(text, isComplete) {
    const task = new Task(text, isComplete);
    this.taskList.push(task);
  }

  toggleTaskComplete(index) {
    this.taskList[index].toggleComplete();
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  // returns creation date or last edit date if it exists
  getDate() {
    const prefix = this.lastEditDate ? "Edited" : "Created";
    const date = this.lastEditDate ? this.lastEditDate : this.creationDate;
    return `${prefix}: ${String(date.getMonth() + 1).padStart(2, "0")}/${String(
      date.getDate()
    ).padStart(2, "0")}/${date.getFullYear()} ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }
}

class Task {
  constructor(text, isComplete = false) {
    this.text = text;
    this.isComplete = isComplete;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}
