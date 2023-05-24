export default class TodoItem {
  constructor(title, description, priority) {
    this._title = title;
    this._description = description;
    this.priority = priority;
    this.taskList = [];
    this.isComplete = false;
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
  }

  getTaskList() {
    return this.taskList;
  }

  addTask(text, isComplete) {
    const task = new Task(text, isComplete);
    this.taskList.push(task);
  }

  replaceTasks(listTask) {
    this.taskList.length = 0;
    for (const task of listTask) {
      const taskItem = new Task(task);
      this.taskList.push(taskItem);
    }
  }

  toggleTaskComplete(index) {
    this.taskList[index].toggleComplete();
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
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
