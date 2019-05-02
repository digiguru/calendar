import React, { Component } from 'react';
import './App.css';
import {PeopleProject} from './views/PeopleProject/PeopleProject';
import {Project} from './views/ProjectDetails/Project';
import ls from 'local-storage';
import {Defaults} from './defaults/DefaultProjects';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projectUsers: [],
      projects: []
    };
  }
  setupDefaultProjectUsers() {
    ls.set('projectUsers', Defaults.ProjectUsers);
    return Defaults.ProjectUsers;
  }
  setupDefaultProjects() {
    ls.set('projects', Defaults.Projects);
    return Defaults.Projects;
  }
  componentDidMount() {
    let projectUsers = ls.get('projectUsers'),
        projects = ls.get('projects');
    if(!projectUsers || !projectUsers.length) {
      projectUsers = this.setupDefaultProjectUsers();
    }
    if(!projects || !projects.length) {
      projects = this.setupDefaultProjects();
    }

    this.setState({
      projectUsers: projectUsers,
      projects: projects
    });
  }
  addProject = () => {
    alert("Add Project");
    this.setState({
      project: {type:"NewProject"}, 
      unique: this.getUnique()
    });
  }
  addPerson() {
    alert("Add Person");
  }
  getUnique() {
    return new Date().valueOf()
  }
  editProject = (name)  => (e) => {
    const projects = ls.get('projects');
    const project = projects.find(v => v.name === name);
    this.setState({
      project: Object.assign({...project, 
        type:"EditProject", 
        unique: this.getUnique()
    })
    });
  }
  
  render() {
    //const reRender = !!this.state.project;
    return (
      <React.Fragment>

      <div className="App">
        <header className="App-header">
          <PeopleProject items={this.state.projectUsers} 
            onAddProject={this.addProject}  onAddPerson={this.addPerson}
            onEditProject={this.editProject}
          />
        </header>
      </div>
      <main>
           {this.state.project && <Project {... this.state.project} />}
      </main>
      
      </React.Fragment>
      
    );
  }
}

export default App;
