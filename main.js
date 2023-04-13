import Project from "./modules/project";
import DisplayController from "./modules/DisplayController";

const addProjectButton = document.querySelector(".add-project-button");

const app = (function () {
  const _projectList = [];
  let _currentProject;

  const getProjectList = () => {
    return _projectList;
  };

  const addProject = (projectName) => {
    const newPoject = new Project(projectName);
    _projectList.push(newPoject);
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
    addProject("default");
    setCurrentProject(0);
    DisplayController.updateDisplay(_projectList, _currentProject);
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
  app.addProject("project" + app.getProjectList().length);
  DisplayController.updateDisplay(
    app.getProjectList(),
    app.getCurrentProject()
  );
});

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

// TODO Organizar mejor
console.log(app.getCurrentProject());
