export default function getTodoElement(todo) {
  const isTodoChecked = todo.isComplete;
  const todoElement = document.createElement("li");
  todoElement.classList.add("todo-element-container");
  todoElement.setAttribute("data-priority", todo.priority);

  todoElement.innerHTML = `
          <div class="title-row">
            <label class="input-container">
              <input class="complete-todo" type="checkbox" name="" />
              <div class="checkbox"></div>
              <h3>${todo.title}</h3>
            </label>
          </div>
          <p class="description">${todo.description}</p>
      
          <ul class="tasks-list">
            ${getTaskListElement(todo)}
          </ul>

          <div class="buttons-row">
            <button title="Edit todo" class="show-edit-todo-form"></button>
            <button title="Delete todo" class ="delete-todo"></button>
            <p class="priority ${todo.priority}">
          ${todo.priority} priority</p>
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
    result += `<li data-taskIndex="${index}">
      <label>
        <input ${
          task.isComplete ? "checked" : ""
        } type="checkbox" class="task-complete">
        <p>${task.text}</p>
      </label>
    </li>`;
    index++;
  }

  return result;
}
