import Project from "./modules/project";
import updateProjectListDisplay from "./modules/mediator";

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
    if (projectIndex == 0) return;
    // Deleting same project as current project should move current project -1
    if (_projectList[projectIndex] === _currentProject) {
      this.setCurrentProject(projectIndex - 1);
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
    updateProjectListDisplay(undefined, app.getProjectList());
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
  updateProjectListDisplay(
    () => app.addProject("project" + app.getProjectList().length),
    app.getProjectList()
  );
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-project")) {
    const deleteButton = e.target;
    const projectIndex = deleteButton.getAttribute("data-index");

    updateProjectListDisplay(
      () => app.deleteProject(projectIndex),
      app.getProjectList()
    );
  }
});

// TODO Organizar mejor
console.log(app.getCurrentProject());
