import TodoItem from "./todoItem";

export default class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.todoList = [];
  }

  addTodo(title, description) {
    const newTodo = new TodoItem(title, description);
    this.todoList.push(newTodo);
  }

  deleteTodo(todoIndex) {
    if (this.todoList.length === 0) return;

    this.todoList.splice(todoIndex, 1);
  }
}
