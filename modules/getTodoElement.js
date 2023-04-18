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
            <input type="checkbox" name="" id="" />
            <h3>${todo.title}</h3>
          </div>
          <p class="description">${todo.description}</p>
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
