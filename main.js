import Project from "./modules/project";
import TodoItem from "./modules/todoItem";
import DisplayController from "./modules/DisplayController";
import {
  NewProjectFormController,
  AddTodoFormController,
  EditTodoFormController,
} from "./modules/formsController";
import { deserialize, serialize } from "./modules/serialization";

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

const saveEditButton = document.querySelector("#edit-modal .edit-todo");
const editModal = document.querySelector("#edit-modal");
const addTaskEdit = document.querySelector(".edit-add-task");

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
    _currentProject.addTodo(
      new TodoItem("Example todo", "This is an example todo", "low")
    );
    console.log(_currentProject);
    _currentProject.todoList[0].addTask("Example task item 1", true);
    _currentProject.todoList[0].addTask("Example task item 2");
    DisplayController.updateDisplay(_projectList, _currentProject);

    const ser = serialize(app.getProjectList());
    console.log(ser);
    console.log(deserialize(ser));
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
  const wasTodoAdded = currentProject.addTodo(new TodoItem(...inputsValue));
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
  if (e.target.classList.contains("show-edit-todo-form")) {
    EditTodoFormController.openModal(
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
  }
});

saveEditButton.addEventListener("click", () => {
  const index = editModal.getAttribute("data-index");
  const newTodoValues = EditTodoFormController.getNewValues();

  app.getCurrentProject().todoList[index].editTodo(...newTodoValues);
  app.getCurrentProject().todoList[index].replaceTasks(newTodoValues[3]);
  EditTodoFormController.closeModal();
  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
});

addTaskEdit.addEventListener("click", EditTodoFormController.addTask);

editModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-task")) {
    const listItem = e.target.closest("li");
    listItem.remove();
  }
});
