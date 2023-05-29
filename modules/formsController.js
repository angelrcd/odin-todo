const showNewProjectFormButton = document.querySelector(
  ".show-new-project-form"
);
const newProjectForm = document.querySelector(".new-project-form");
const newProjectNameInput = document.querySelector(".new-project-form input");
const overlay = document.querySelector(".overlay");

const newTodoModal = document.querySelector(".new-todo-form");
const addTitleInput = document.querySelector("#add-title");
const addDescriptionInput = document.querySelector("#add-description");
const addPriorityInput = document.querySelector("select#priority");
const addTaskButton = document.querySelector(".add-todo-task-list button");
const addTaskInput = document.querySelector(".add-todo-task-list input");
const addTaskList = document.querySelector(".add-todo-task-list-items");
const addTodoButton = document.querySelector(".add-todo-button");

const editTodoModal = document.querySelector(".edit-todo-form");
const editTitleInput = document.querySelector("#edit-title");
const editDescriptionInput = document.querySelector("#edit-description");
const editPriorityInput = document.querySelector("#edit-priority");
const editTaskButton = document.querySelector(".edit-task-list button");
const editTaskInput = document.querySelector(".edit-task-list input");
const editTaskList = document.querySelector(".edit-task-list-items");
const editTodoButton = document.querySelector(".edit-todo-button");

// Clicking overlay closes modals
overlay.addEventListener("click", () => {
  AddTodoFormController.closeModal();
  EditTodoFormController.closeModal();
});

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
  static openForm() {
    if (addTitleInput.value === "" || addDescriptionInput.value === "") {
      addTodoButton.disabled = true;
    } else {
      addTodoButton.disabled = false;
    }

    newTodoModal.classList.add("open");
    overlay.classList.remove("hidden");
    document.body.classList.add("overlay-open");
  }

  static closeModal() {
    newTodoModal.classList.remove("open");
    overlay.classList.add("hidden");
    document.body.classList.remove("overlay-open");
  }

  static getInputsValue() {
    return [
      addTitleInput.value,
      addDescriptionInput.value,
      addPriorityInput.value,
      this.getAllTasksValues(),
    ];
  }

  static clearInputs() {
    addTitleInput.value = "";
    addDescriptionInput.value = "";
    addPriorityInput.value = "low";
    addTaskList.innerHTML = "";
  }

  // Disables button if inputs are invalid
  static startValidInputsListener() {
    const inputs = [addTitleInput, addDescriptionInput];
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (addTitleInput.value === "" || addDescriptionInput.value === "") {
          addTodoButton.disabled = true;
        } else {
          addTodoButton.disabled = false;
        }
      });
    });
  }

  static appendTask(name) {
    if (!name) return;

    addTaskInput.value = "";
    const li = document.createElement("li");
    li.classList.add("task-list-item");
    li.innerHTML = `<p contentEditable>${name}</p><button class='delete-task'>Remove</button>`;
    addTaskList.append(li);
  }

  static getNewTaskName() {
    const name = addTaskInput.value;
    return name;
  }

  static getAllTasksValues() {
    const taskItems = addTaskList.querySelectorAll("li p");
    return Array.from(taskItems).map((taskItem) => taskItem.innerText);
  }
}

addTaskButton.addEventListener("click", () => {
  const newTaskName = AddTodoFormController.getNewTaskName();
  AddTodoFormController.appendTask(newTaskName);
});

export class EditTodoFormController {
  static openForm(todo, index) {
    editTodoModal.setAttribute("data-index", index);
    console.log(todo.description);
    editTitleInput.value = todo.title;
    editDescriptionInput.value = todo.description;
    editPriorityInput.value = todo.priority;

    if (editTitleInput.value === "" || editDescriptionInput.value === "") {
      editTodoButton.disabled = true;
    } else {
      editTodoButton.disabled = false;
    }

    editTaskList.innerHTML = "";
    for (const task of todo.taskList) {
      const taskList = document.createElement("li");
      taskList.classList.add("task-list-item");
      taskList.innerHTML = `<p contentEditable>${task.text}</p><button class="delete-task">Remove</button>`;
      editTaskList.appendChild(taskList);
    }
    editTodoModal.classList.add("open");
    overlay.classList.remove("hidden");
    document.body.classList.add("overlay-open");
  }

  static closeModal() {
    editTodoModal.classList.remove("open");
    overlay.classList.add("hidden");
    document.body.classList.remove("overlay-open");
  }

  static addTask(name) {
    if (!name) return;

    const newTask = document.createElement("li");
    newTask.classList.add("task-list-item");
    newTask.innerHTML = `<p contentEditable>${name}</p><button class='delete-task'>Remove</button>`;

    editTaskList.appendChild(newTask);
    editTaskInput.value = "";
  }

  static getNewValues() {
    let newTaskValues = Array.from(editTaskList.querySelectorAll("li p")).map(
      (taskItem) => taskItem.textContent
    );

    return [
      editTitleInput.value,
      editDescriptionInput.value,
      editPriorityInput.value,
      newTaskValues,
    ];
  }

  static startValidInputsListener() {
    const inputs = [editTitleInput, editDescriptionInput];
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (editTitleInput.value === "" || editDescriptionInput.value === "") {
          editTodoButton.disabled = true;
        } else {
          editTodoButton.disabled = false;
        }
      });
    });
  }
}

editTaskButton.addEventListener("click", () => {
  const newTaskName = editTaskInput.value;
  EditTodoFormController.addTask(newTaskName);
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    AddTodoFormController.closeModal();
    EditTodoFormController.closeModal();
  }
});
