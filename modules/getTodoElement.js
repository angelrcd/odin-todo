export default function getTodoElement(todo) {
  const isTodoChecked = todo.isComplete;
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo-element-container");
  todoElement.setAttribute("data-priority", todo.priority);

  todoElement.innerHTML = `
          <p class="priority-indicator ${
            todo.priority
          }">${todo.priority.toUpperCase()} priority</p>
          <div class="title-row">
            <label class="input-container">
              <input class="complete-todo" type="checkbox" name="" />
              <div class="checkbox"></div>
            </label>
            <h3>${todo.title}</h3>
          </div>
          <p class="description">${todo.description}</p>
      
          <ul class="tasks-list">
            ${getTaskListElement(todo)}
          </ul>

          <div class="buttons-row">
            <button class="show-edit-todo-form">Edit</button>
            <button class ="delete-todo">Delete</button>
            <p class="date">${todo.getDate()}</p>
          </div>
  `;
  const isCompleteElement = todoElement.querySelector(" input");
  if (isTodoChecked) {
    todoElement.classList.add("complete");
    isCompleteElement.checked = true;
  }

  return todoElement;
}

function getTaskListElement(todo) {
  const taskList = todo.getTaskList();
  let result = "";
  let index = 0;
  for (const task of taskList) {
    result += `<li data-taskIndex="${index}"><input ${
      task.isComplete ? "checked" : ""
    } type="checkbox" class="task-complete"><p>${task.text}</p></li>`;
    index++;
  }

  return result;
}
