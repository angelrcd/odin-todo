export default class TodoItem {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.isComplete = false;
    this.creationDate = new Date();
    this.lastEditDate = null;
  }

  set title(newTitle) {
    if (newTitle.length === 0) return;
    this.title = newTitle;
  }

  set description(newDescription) {
    if (newDescription.length === 0) return;
    this.description = newDescription;
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
