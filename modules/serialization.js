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
      projectObject.addTodo(TodoItem.getTodoInstanceFromSerialization(todo));
    });
    return projectObject;
  });
}
