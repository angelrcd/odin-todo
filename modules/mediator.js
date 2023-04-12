// Function to be called when adding or deleting projects
export default function updateProjectListDisplay(logicFunction, projectList) {
  const list = document.querySelector("#projects-list ul");
  list.innerHTML = "";
  logicFunction?.();

  projectList.forEach((project, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    listItem.textContent = project.projectName;

    const deleteProjectButton = document.createElement("button");
    deleteProjectButton.classList.add("delete-project");
    deleteProjectButton.textContent = "-";
    deleteProjectButton.setAttribute("data-index", index);

    listItem.insertAdjacentElement("beforeend", deleteProjectButton);

    list.appendChild(listItem);
  });
}
