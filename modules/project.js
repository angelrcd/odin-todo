import TodoItem from "./todoItem";

export default class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.todoList = [];
  }

  addTodo(title, description, priority) {
    const newTodo = new TodoItem(title, description, priority);
    if (!newTodo.title || !newTodo.description) return false;
    this.todoList.push(newTodo);
    return true;
  }

  deleteTodo(todoIndex) {
    if (this.todoList.length === 0) return;

    this.todoList.splice(todoIndex, 1);
  }
}
