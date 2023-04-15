const showNewProjectFormButton = document.querySelector(
  ".show-new-project-form"
);
const newProjectForm = document.querySelector(".new-project-form");
const newProjectNameInput = document.querySelector(".new-project-form input");

const showNewTodoFormButton = document.querySelector(".show-new-todo-form");
const newTodoForm = document.querySelector(".new-todo-form");
const todoTitleForm = document.querySelector("#add-title");
const todoDescriptionForm = document.querySelector("#add-description");
const todoPriorityForm = document.querySelector("select#priority");

export class NewProjectFormController {
  static toggleForm() {
    newProjectForm.classList.toggle("hidden");
    showNewProjectFormButton.classList.toggle("hidden");
  }

  static getInputValue() {
    return newProjectNameInput.value;
  }

  static clearInput() {
    newProjectNameInput.value = "";
  }
}

export class AddTodoFormController {
  static toggleForm() {
    showNewTodoFormButton.classList.toggle("hidden");
    newTodoForm.classList.toggle("hidden");
  }

  static getInputsValue() {
    return [
      todoTitleForm.value,
      todoDescriptionForm.value,
      todoPriorityForm.value,
    ];
  }

  static clearInputs() {
    todoTitleForm.value = "";
    todoDescriptionForm.value = "";
    todoPriorityForm.value = "low";
  }
}
