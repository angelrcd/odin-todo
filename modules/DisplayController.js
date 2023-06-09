import getTodoElement from "./getTodoElement";

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

      const projectTextItem = document.createElement("span");
      projectTextItem.textContent = project.projectName;
      projectTextItem.setAttribute("data-index", index);
      listItem.appendChild(projectTextItem);

      if (project === currentProject) {
        listItem.classList.add("current-project");
      }

      if (index != 0) {
        const deleteProjectButtonContainer = document.createElement("div");
        deleteProjectButtonContainer.classList.add("delete-project-container");

        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.classList.add("delete-project");
        deleteProjectButton.setAttribute("data-index", index);

        deleteProjectButtonContainer.appendChild(deleteProjectButton);

        listItem.insertAdjacentElement(
          "beforeend",
          deleteProjectButtonContainer
        );
      }

      projectListElement.appendChild(listItem);
    });
  }

  static #updateTodoList(currentProject) {
    const currentProjectTitle = document.querySelector("#current-project h2");
    const todoListElement = document.querySelector("#current-project ul");
    const projectName = currentProject.projectName;
    const numberOfTodos = currentProject.todoList.length;
    const completeTodos = currentProject.todoList.reduce((acc, current) => {
      if (current.isComplete) acc++;
      return acc;
    }, 0);

    todoListElement.innerHTML = "";

    currentProjectTitle.innerHTML = `${projectName} <span>(${numberOfTodos} To-Dos, ${completeTodos} completed)</span>`;
    const listOfTodos = currentProject.todoList;

    listOfTodos.forEach((todo, index) => {
      const listItem = getTodoElement(todo);
      listItem.setAttribute("data-index", index);

      todoListElement.appendChild(listItem);
    });
  }
}
