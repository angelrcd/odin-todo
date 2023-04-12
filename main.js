import Project from "./modules/project";
import updateDisplayProjectsList from "./modules/DOM/ProjectsListItem";

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

// TODO Organizar mejor
updateDisplayProjectsList(app.getProjectList());
app.addProject("proeycto1");
updateDisplayProjectsList(app.getProjectList());
