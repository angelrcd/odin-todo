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

const editModal = document.querySelector("#edit-modal");
const editTitle = document.querySelector("#edit-modal .new-title");
const editDescription = document.querySelector("#edit-modal .new-description");
const editPriority = document.querySelector("#edit-modal select");

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

export class EditTodoFormController {
  static openModal(todo, index) {
    editModal.setAttribute("data-index", index);
    editTitle.textContent = todo.title;
    editDescription.textContent = todo.description;
    editPriority.value = todo.priority;
    editModal.showModal();
  }

  static closeModal() {
    editModal.close();
  }

  static getNewValues() {
    return [
      editTitle.textContent,
      editDescription.textContent,
      editPriority.value,
    ];
  }
}
