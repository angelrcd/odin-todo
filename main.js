import Project from "./modules/project";
import TodoItem from "./modules/todoItem";
import DisplayController from "./modules/DisplayController";
import {
  NewProjectFormController,
  AddTodoFormController,
  EditTodoFormController,
} from "./modules/formsController";
import { deserialize } from "./modules/serialization";
import saveStorage from "./modules/Storage";

const projectListContainer = document.querySelector("#projects-list");

const addProjectButton = document.querySelector(".add-project-button");
const addTodoButton = document.querySelector(".add-todo-button");
const showNewProjectFormButton = document.querySelector(
  ".show-new-project-form"
);
const showNewTodoFormButton = document.querySelector(".show-new-todo-form");
const newProjectNameInput = document.querySelector(".new-project-form input");
const cancelNewProjectButton = document.querySelector(".cancel-new-project");
const cancelNewTodoButton = document.querySelectorAll(".cancel-new-todo");
const todoTitleForm = document.querySelector("#add-title");
const addModal = document.querySelector(".new-todo-form");

const saveEditButton = document.querySelector(".edit-todo-button");
const editModal = document.querySelector(".edit-todo-form");
const cancelEditTodoButton = document.querySelectorAll(".cancel-edit-todo");

// Start event listeners for input validation
AddTodoFormController.startValidInputsListener();
EditTodoFormController.startValidInputsListener();

// Mobile menu functionality
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const toggleMobileMenu = () => projectListContainer.classList.toggle("closed");
mobileMenuButton.addEventListener("click", toggleMobileMenu);

const app = (function () {
  let _projectList = [];
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
    const storage = localStorage.getItem("appState");
    if (storage) {
      _projectList = deserialize(storage);
      setCurrentProject(0);
      DisplayController.updateDisplay(_projectList, _currentProject);
      return;
    }

    // Initial setup if there is no storage
    addProject("Default");
    setCurrentProject(0);
    _currentProject.addTodo(
      new TodoItem("A simple To-Do App", "A simple To-Do App", "low")
    );
    _currentProject.addTodo(
      new TodoItem(
        "Todo with a list of tasks",
        "Edit a todo to add or remove tasks",
        "urgent"
      )
    );
    _currentProject.todoList[1].addTask("Example task item 1", true);
    _currentProject.todoList[1].addTask("Example task item 2");

    addProject("Current project");
    _projectList[1].addTodo(
      new TodoItem(
        "Responsive design",
        "Make the app look good in many different screen sizes.",
        "middle"
      )
    );
    _projectList[1].todoList[0].addTask("Add media queries", true);
    _projectList[1].todoList[0].addTask("Create mobile menu", false);
    _projectList[1].addTodo(
      new TodoItem("Sidebar", "Filter by project name.", "low")
    );
    _projectList[1].addTodo(
      new TodoItem("Todo List", "Allow editing todo content.", "urgent")
    );
    _projectList[1].todoList[2].toggleComplete();

    DisplayController.updateDisplay(_projectList, _currentProject);

    // const ser = serialize(app.getProjectList());
    // console.log(ser);
    // console.log(deserialize(ser));
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

const saveLocalStorage = () => {
  saveStorage(app.getProjectList());
};

app.init();

addProjectButton.addEventListener("click", () => {
  const newProjectName = NewProjectFormController.getInputValue();
  app.addProject(newProjectName);

  NewProjectFormController.clearInput();
  NewProjectFormController.toggleForm();

  // set current project at the newly created
  app.setCurrentProject(app.getProjectList().length - 1);

  toggleMobileMenu();
  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
  saveLocalStorage();
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
  saveLocalStorage();
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
projectListContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-project")) {
    const deleteButton = e.target;
    const projectIndex = +deleteButton.getAttribute("data-index");
    app.deleteProject(projectIndex);

    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
    saveLocalStorage();
  } else if (
    e.target.classList.contains("project-container") ||
    e.target.parentElement.classList.contains("project-container")
  ) {
    const projectIndex = +e.target.getAttribute("data-index");
    console.log(projectIndex);
    app.setCurrentProject(projectIndex);

    // Close mobile menu in mobile layout
    if (window.innerWidth < 600) {
      toggleMobileMenu();
    }

    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
  }
});

// Events listeners regarding adding new todo elements
showNewTodoFormButton.addEventListener("click", () => {
  AddTodoFormController.openForm();
  todoTitleForm.focus();
});

cancelNewTodoButton.forEach((cancelButton) => {
  cancelButton.addEventListener("click", () => {
    AddTodoFormController.closeModal();
  });
});

addTodoButton.addEventListener("click", () => {
  const currentProject = app.getCurrentProject();
  const inputsValue = AddTodoFormController.getInputsValue();
  console.log(inputsValue);
  const wasTodoAdded = currentProject.addTodo(new TodoItem(...inputsValue));
  if (wasTodoAdded) {
    AddTodoFormController.clearInputs();
    AddTodoFormController.closeModal();
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
    saveLocalStorage();
  }
});

// Event listener for checking, edit and delete todos
const todoList = document.querySelector("#current-project ul");
todoList.addEventListener("click", (e) => {
  const currentProject = app.getCurrentProject();
  const todoIndex = e.target
    .closest(".todo-element-container")
    .getAttribute("data-index");
  // Set todo as complete
  if (
    e.target.type === "checkbox" &&
    e.target.classList.contains("complete-todo")
  ) {
    currentProject.todoList[todoIndex].toggleComplete();
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
    saveLocalStorage();
  }
  // Delete todo
  if (e.target.classList.contains("delete-todo")) {
    currentProject.deleteTodo(todoIndex);
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
    saveLocalStorage();
  }
  // Edit todo
  if (e.target.classList.contains("show-edit-todo-form")) {
    EditTodoFormController.openForm(
      currentProject.todoList[todoIndex],
      todoIndex
    );
  }
  // Change task completeness
  if (
    e.target.type === "checkbox" &&
    e.target.classList.contains("task-complete")
  ) {
    const taskIndex = e.target.closest("li").getAttribute("data-taskindex");
    currentProject.todoList[todoIndex].toggleTaskComplete(taskIndex);
    DisplayController.updateDisplay(
      app.getProjectList(),
      app.getCurrentProject()
    );
    saveLocalStorage();
  }
});

cancelEditTodoButton.forEach((cancelButton) => {
  cancelButton.addEventListener("click", () => {
    EditTodoFormController.closeModal();
  });
});

saveEditButton.addEventListener("click", () => {
  const index = editModal.getAttribute("data-index");
  const newTodoValues = EditTodoFormController.getNewValues();
  console.log(newTodoValues);

  app.getCurrentProject().todoList[index].editTodo(...newTodoValues);
  app.getCurrentProject().todoList[index].replaceTasks(newTodoValues[3]);
  EditTodoFormController.closeModal();
  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
  saveLocalStorage();
});

editModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const listItem = e.target.closest("li");
    listItem.remove();
  }
});

addModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const listItem = e.target.closest("li");
    listItem.remove();
  }
});
