export default class DisplayController {
  static updateDisplay(projectList, currentProject) {
    this.#updateProjectListDisplay(projectList, currentProject);
    this.#updateTodoList(currentProject);
  }

  static #updateProjectListDisplay(projectList, currentProject) {
    const projectListElement = document.querySelector("#projects-list ul");
    projectListElement.innerHTML = "";

    projectList.forEach((project, index) => {
      const listItem = document.createElement("li");
      listItem.classList.add("project-container");
      listItem.setAttribute("data-index", index);
      listItem.textContent = `${project.projectName} (${project.todoList.length})`;
      if (project === currentProject) {
        listItem.classList.add("current-project");
      }

      if (index != 0) {
        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.classList.add("delete-project");
        deleteProjectButton.textContent = "-";
        deleteProjectButton.setAttribute("data-index", index);
        listItem.insertAdjacentElement("beforeend", deleteProjectButton);
      }

      projectListElement.appendChild(listItem);
    });
  }

  static #updateTodoList(currentProject) {
    const currentProjectTitle = document.querySelector("#current-project h2");
    const todoListElement = document.querySelector("#current-project ul");

    todoListElement.innerHTML = "";

    currentProjectTitle.textContent = currentProject.projectName;
    const listOfTodos = currentProject.todoList;

    listOfTodos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.classList.add("todo-container");
      listItem.textContent = `${todo.title} - ${todo.description}`;

      todoListElement.appendChild(listItem);
    });
  }
}
