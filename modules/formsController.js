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
const addTaskButton = document.querySelector(".add-todo-task-list button");
const addTaskInput = document.querySelector(".add-todo-task-list input");
const addTaskList = document.querySelector(".add-todo-task-list-items");
const addTodoButton = document.querySelector(".add-todo-button");

const overlay = document.querySelector(".overlay");

const editModal = document.querySelector("#edit-modal");
const editTitle = document.querySelector("#edit-modal .new-title");
const editDescription = document.querySelector("#edit-modal .new-description");
const editPriority = document.querySelector("#edit-modal select");
const editTaskList = document.querySelector(".edit-todo-tasks");

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
    if (todoTitleForm.value === "" || todoDescriptionForm.value === "") {
      addTodoButton.disabled = true;
    } else {
      addTodoButton.disabled = false;
    }

    newTodoForm.classList.toggle("open");
    overlay.classList.toggle("hidden");
    document.body.classList.toggle("overlay-open");
  }

  static getInputsValue() {
    return [
      todoTitleForm.value,
      todoDescriptionForm.value,
      todoPriorityForm.value,
      this.getAllTasksValues(),
    ];
  }

  static clearInputs() {
    todoTitleForm.value = "";
    todoDescriptionForm.value = "";
    todoPriorityForm.value = "low";
    addTaskList.innerHTML = "";
  }

  // Disables button if inputs are invalid
  static startValidInputsListener() {
    const inputs = [todoTitleForm, todoDescriptionForm];
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (todoTitleForm.value === "" || todoDescriptionForm.value === "") {
          addTodoButton.disabled = true;
        } else {
          addTodoButton.disabled = false;
        }
      });
    });
  }

  static appendTask(name) {
    addTaskInput.value = "";
    const li = document.createElement("li");
    li.innerText = name;
    addTaskList.append(li);
  }

  static getNewTaskName() {
    const name = addTaskInput.value;
    return name;
  }

  static getAllTasksValues() {
    const taskItems = addTaskList.querySelectorAll("li");
    return Array.from(taskItems).map((taskItem) => taskItem.innerText);
  }
}

addTaskButton.addEventListener("click", () => {
  const newTaskName = AddTodoFormController.getNewTaskName();
  AddTodoFormController.appendTask(newTaskName);
});

export class EditTodoFormController {
  static openModal(todo, index) {
    editModal.setAttribute("data-index", index);
    editTitle.textContent = todo.title;
    editDescription.textContent = todo.description;
    editPriority.value = todo.priority;

    editTaskList.innerHTML = "";
    for (const task of todo.taskList) {
      const taskList = document.createElement("li");
      taskList.innerHTML = `<p contentEditable>${task.text}</p><button class="delete-task"></button>`;
      editTaskList.appendChild(taskList);
    }
    editModal.showModal();
  }

  static closeModal() {
    editModal.close();
  }

  static addTask() {
    const newTask = document.createElement("li");
    newTask.innerHTML =
      "<p contentEditable>Task</p><button class='delete-task'></button>";

    editTaskList.appendChild(newTask);
  }

  static getNewValues() {
    let newTaskValues = Array.from(editTaskList.querySelectorAll("li")).map(
      (taskItem) => taskItem.textContent
    );

    return [
      editTitle.textContent,
      editDescription.textContent,
      editPriority.value,
      newTaskValues,
    ];
  }
}
