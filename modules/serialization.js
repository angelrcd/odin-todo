import Project from "./project";
import TodoItem from "./todoItem";
// Module to save app state in a json object
export function serialize(app) {
  return JSON.stringify(app);
}

export function deserialize(jsonApp) {
  const jsonObject = JSON.parse(jsonApp);
  return jsonObject.map((project) => {
    const projectObject = new Project(project.projectName);

    project.todoList.forEach((todo) => {
      projectObject.addTodo(getTodoInstanceFromSerialization(todo));
    });
    return projectObject;
  });
}

function getTodoInstanceFromSerialization(todoSerialization) {
  const todo = new TodoItem(
    todoSerialization._title,
    todoSerialization._description,
    todoSerialization.priority
  );

  const creationDate = new Date(Date.parse(todoSerialization.creationDate));
  todo.creationDate = creationDate;
  if (todoSerialization.lastEditDate) {
    const editDate = new Date(Date.parse(todoSerialization.lastEditDate));
    todo.lastEditDate = editDate;
  }

  if (todoSerialization.isComplete) todo.toggleComplete();

  for (const task of todoSerialization.taskList) {
    todo.addTask(task.text, task.isComplete);
  }

  return todo;
}
