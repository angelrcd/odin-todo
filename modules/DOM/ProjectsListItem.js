const ul = document.querySelector("#projects-list ul");

export default function updateDisplayProjectsList(projectList) {
  clearPreviousProjectsList();
  const projectListItems = getProjecstListItems(projectList);
  ul.appendChild(projectListItems);
}

function getProjecstListItems(projectList) {
  const result = document.createDocumentFragment();
  projectList.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.projectName;
    result.appendChild(li);
  });

  return result;
}

function clearPreviousProjectsList() {
  ul.innerHTML = "";
}
