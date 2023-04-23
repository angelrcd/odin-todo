export default class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.todoList = [];
  }

  addTodo(todo) {
    if (!todo.title || !todo.description) return false;
    this.todoList.push(todo);
    return true;
  }

  deleteTodo(todoIndex) {
    if (this.todoList.length === 0) return;

    this.todoList.splice(todoIndex, 1);
  }
}
