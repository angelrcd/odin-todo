export default class TodoItem {
  constructor(title, description) {
    this._title = title;
    this._description = description;
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

  editTodo(newTitle, newDescription) {
    this.title = newTitle;
    this.description = newDescription;
    this.lastEditDate = new Date();
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }

  // returns creation date or last edit date if it exists
  getDate() {
    return this.lastEditDate ? this.lastEditDate : this.creationDate;
  }
}
