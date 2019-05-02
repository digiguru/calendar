import React, { Component } from 'react';
import { FormRowSlider } from "./FormElements/FormRowSlider";
import { FormRowOptions } from "./FormElements/FormRowOptions";
import { FormRowTextArea, FormColapsedTextArea } from "./FormElements/FormRowTextArea";
import { FormRowInput } from "./FormElements/FormRowInput";
import { TeamCost } from '../logic/TeamCost';
import { TeamDelivery } from '../logic/TeamDelivery';
import { ProjectParser } from "../logic/ProjectParser";
import { Defaults } from '../defaults/DefaultTeamSlider';
import { TabSet } from './SaveArea/SaveArea';
import ls from 'local-storage';

export class TeamSlider extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            project: Defaults.GetState(),
            activeProject: "",
            projectNames: [],
            ...this.getState()
        }
    }
    mapTabState(projects) {
        return projects.map(v => {
            return {name: v.name}
        });
    }
    getState(name) {
        console.log("GetSTate", name);
        let allProjects = ls.get('TeamSliderState'),
            myState = { 
                project: {},
                activeProject: "",
                projectNames: []
            };
        if(!allProjects || !allProjects.length) {
            myState.project = Defaults.GetState();
        } else {
            let temp;
            if(name) {
                temp = allProjects.find(v => v.name === name);
            }
            if (!temp) {
                temp = allProjects[0];
            }
            myState.projectNames = this.mapTabState(allProjects);
            myState.project = temp.value;
            myState.activeProject = temp.name;
        }
        return myState;
    }
    saveState(saveName) {
        console.log("Save name", saveName)
        let projects = ls.get('TeamSliderState');
        if (!projects || !projects.length) {
            projects = [];
        }
        const alreadyExists = projects.findIndex(v => v.name === saveName);
        if (alreadyExists >= 0) {
            projects.splice(alreadyExists, 1);
        }
        projects.unshift({
            name: saveName,
            value: this.state.project
        });

        ls.set('TeamSliderState', projects);
        this.setState({projectNames:this.mapTabState(projects), activeProject:saveName});
    }

    componentDidMount() {
       
    }
    componentWillReceiveProps(props) {

    }
    getProjectsForRender(arr, justImportant) {
        return arr.filter(v => justImportant ? v.important : true).map(v => v.name).join("\n")
    }
    handleChange = (e,v) => {
        
        this.setState((state, props) => {
            let tempProject = { ...state.project, [e]:v}
            const calc = new TeamCost(10000, 5000);
            const cost = calc.calculate(tempProject.teamsize, tempProject.teamcount);
            
            const deliveryCalc = new TeamDelivery();
            
            const projects = tempProject.projects.split("\n").map(v => ProjectParser.fromString(v));
            const data = deliveryCalc.calculate(tempProject.teamsize, tempProject.teamcount, projects, tempProject.efficiency);
            //const {now, next, soon, later, never} = data;
            const now = this.getProjectsForRender(data.now.tasks, tempProject.important);//.map(v => v.name).join("\n");
            const next = data.next.tasks.map(v => v.name).join("\n");
            const soon = data.soon.tasks.map(v => v.name).join("\n");
            const later = data.later.tasks.map(v => v.name).join("\n");
            const never = data.never.tasks.map(v => v.name).join("\n");
           
            const tempState = { ...state, project: tempProject, cost, now, next, soon, later, never};
            return tempState;
        });

        //this.handleSubmit();
    }
    handleSaveAs = (e,v) => {
        const file = window.prompt("What do you want to call the file?");
        this.saveState(file);
    }
    handleSave = (e,v) => {
        this.saveState(this.state.activeProject);
        /*const calc = new TeamCost(10000, 5000);
        const output = calc.calculate(this.state.teamsize, this.state.teamcount);
        this.setState({cost: output}); */
    }
    handleChangeTab = (e) =>{
        const saveableSTate = this.getState(e);
        console.log("Loading ", e, saveableSTate);

        this.setState({ ...saveableSTate});
    }
    render() {
        
        
        
        return (
        <React.Fragment>

        <div className="App">
          <header className="App-header">
            <TabSet tabs={this.state.projectNames} activeTab={this.state.activeProject} handleChangeTab={this.handleChangeTab} />
          </header>
          <main>
          <form>
                <h1>Input</h1>
                <FormRowSlider id="teamsize" label="Developers per Team" min="1" max="7" value={this.state.project.teamsize} handleChange={this.handleChange} />
                <FormRowSlider id="teamcount" label="Number of Teams" min="1" max="7" value={this.state.project.teamcount} handleChange={this.handleChange} />
                <FormRowSlider id="efficiency" label="Efficiency" min="10" max="100" step="5" value={this.state.project.efficiency} handleChange={this.handleChange} />
                
                <FormRowTextArea type="textarea" id="projects" label="Projects" value={this.state.project.projects} handleChange={this.handleChange} />

                <FormRowOptions type="radio" id="important" label="View Only Important tasks" value={this.state.project.important} handleChange={this.handleChange} />
                <div>
                <button type="button" className={((this.state.activeProject) ? "btn btn-primary mr-2" : "d-none")} onClick={this.handleSave}>Save {this.state.activeProject}</button>
                <button type="button" className="btn btn-outline-primary" onClick={this.handleSaveAs}>{this.state.activeProject ? "Save a copy..." : "Save"}</button>
                </div>
                <hr />
               
                
                
            </form>
            <h1>Output</h1>

           


            <FormRowInput type="number" step="any" id="cost" label="Monthly Cost" value={this.state.cost} />
           
            <div className="row">
                <div className="col-sm">
                    <FormColapsedTextArea type="textarea" id="week" label="Now (1 week)" readonly={true} value={this.state.now} />
                </div>
                <div className="col-sm">
                    <FormColapsedTextArea type="textarea" id="month" label="Next (+1 month)" readonly={true} value={this.state.next} />
                </div>
                <div className="col-sm">
                    <FormColapsedTextArea type="textarea" id="quarter" label="Soon (+1 quarter)" readonly={true} value={this.state.soon} />
                </div>
                <div className="col-sm">
                    <FormColapsedTextArea type="textarea" id="annual" label="Later (+1 year)" readonly={true} value={this.state.later} />
                </div>
            </div>
            <div className="row">
                <FormColapsedTextArea type="textarea" id="never" label="Unlikely (everything else)" readonly={true} value={this.state.never} />
            </div>

        </main>
        </div>
        </React.Fragment>
        );
    }
}