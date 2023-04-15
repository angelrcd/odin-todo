import Project from "./modules/project";
import DisplayController from "./modules/DisplayController";
import {
  NewProjectFormController,
  AddTodoFormController,
} from "./modules/formsController";

const addProjectButton = document.querySelector(".add-project-button");
const addTodoButton = document.querySelector(".add-todo-button");
const showNewProjectFormButton = document.querySelector(
  ".show-new-project-form"
);
const showNewTodoFormButton = document.querySelector(".show-new-todo-form");
const newProjectNameInput = document.querySelector(".new-project-form input");
const cancelNewProjectButton = document.querySelector(".cancel-new-project");
const cancelNewTodoButton = document.querySelector(".cancel-new-todo");
const todoTitleForm = document.querySelector("#add-title");

const app = (function () {
  const _projectList = [];
  let _currentProject;

  const getProjectList = () => {
    return _projectList;
  };

  const addProject = (projectName) => {
    if (projectName === "") return false;

    const newPoject = new Project(projectName);
    _projectList.push(newPoject);
    return true;
  };

  const deleteProject = (projectIndex) => {
    // Must not delete default project
    if (projectIndex === 0) return;
    // Deleting same project as current project should move current project -1
    if (_projectList[projectIndex] === _currentProject) {
      setCurrentProject(projectIndex - 1);
    }

    _projectList.splice(projectIndex, 1);
  };

  const getCurrentProject = () => {
    return _currentProject;
  };

  const setCurrentProject = (projectIndex) => {
    _currentProject = _projectList[projectIndex];
  };

  const init = () => {
    addProject("Default");
    setCurrentProject(0);
    _currentProject.addTodo("Example todo", "This is an example todo.", "low");
    DisplayController.updateDisplay(_projectList, _currentProject);
  };

  return {
    getProjectList,
    addProject,
    deleteProject,
    init,
    getCurrentProject,
    setCurrentProject,
  };
})();

app.init();

addProjectButton.addEventListener("click", () => {
  const newProjectName = NewProjectFormController.getInputValue();
  app.addProject(newProjectName);

  NewProjectFormController.clearInput();
  NewProjectFormController.toggleForm();

  // set current project at the newly created
  app.setCurrentProject(app.getProjectList().length - 1);

  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
});

newProjectNameInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") NewProjectFormController.toggleForm();
  if (e.key !== "Enter") return;

  const newProjectName = NewProjectFormController.getInputValue();
  const isProjectAdded = app.addProject(newProjectName);

  NewProjectFormController.clearInput();
  NewProjectFormController.toggleForm();

  // set current project at the newly created
  if (isProjectAdded) {
    app.setCurrentProject(app.getProjectList().length - 1);
  }

  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
});

showNewProjectFormButton.addEventListener("click", () => {
  NewProjectFormController.toggleForm();
  newProjectNameInput.focus();
});
cancelNewProjectButton.addEventListener(
  "click",
  NewProjectFormController.toggleForm
);

// Events listeners for changing current project and deleting them
const projectListContainer = document.querySelector("#projects-list");
projectListContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-project")) {
    const deleteButton = e.target;
    const projectIndex = +deleteButton.getAttribute("data-index");
    app.deleteProject(projectIndex);

    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
  } else if (e.target.classList.contains("project-container")) {
    const projectIndex = +e.target.getAttribute("data-index");
    app.setCurrentProject(projectIndex);

    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
  }
});

// Events listeners regarding adding new todo elements
showNewTodoFormButton.addEventListener("click", () => {
  AddTodoFormController.toggleForm();
  todoTitleForm.focus();
});

cancelNewTodoButton.addEventListener("click", () => {
  AddTodoFormController.toggleForm();
});

addTodoButton.addEventListener("click", () => {
  const currentProject = app.getCurrentProject();
  const inputsValue = AddTodoFormController.getInputsValue();
  const wasTodoAdded = currentProject.addTodo(...inputsValue);
  if (wasTodoAdded) {
    AddTodoFormController.clearInputs();
    AddTodoFormController.toggleForm();
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
  }
  console.log(currentProject.todoList.at(-1));
});

// Event listener for checking, edit and delete todos
const todoList = document.querySelector("#current-project ul");
todoList.addEventListener("click", (e) => {
  const currentProject = app.getCurrentProject();
  const todoIndex = e.target
    .closest(".todo-element-container")
    .getAttribute("data-index");
  console.log(todoIndex);
  // Set todo as complete
  if (e.target.type === "checkbox") {
    currentProject.todoList[todoIndex].toggleComplete();
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
  }
  // Delete todo
  if (e.target.classList.contains("delete-todo")) {
    currentProject.deleteTodo(todoIndex);
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
  }
  // Edit todo
  if (e.target.classList.contains("edit-todo")) {
    currentProject.todoList[todoIndex].editTodo("a", "b");
  }
  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
});
