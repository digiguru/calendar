import React, { Component } from 'react';
import { FormRowSlider } from "./FormElements/FormRowSlider";
import { FormRowOptions } from "./FormElements/FormRowOptions";
import { FormRowTextArea, FormColapsedTextArea } from "./FormElements/FormRowTextArea";
import { FormRowInput } from "./FormElements/FormRowInput";
import { TeamCost } from '../logic/TeamCost';
import { TeamDelivery } from '../logic/TeamDelivery';
import { ProjectParser } from "../logic/ProjectParser";
import {Defaults} from '../defaults/DefaultTeamSlider';
import ls from 'local-storage';

export class TeamSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamsize: 3,
            teamcount:2,
            cost: 10000,
            projects: "",
            efficiency: 70,
            important: false
        }
        
    }
    setupProjects() {
        ls.set('projects', Defaults.Projects);
        return Defaults.Projects;
    }
    componentDidMount() {
        let projects = ls.get('projects');
        if(!projects || !projects.length) {
            projects = this.setupProjects();
        }
        this.setState({
            projects: projects
        });
    }
    componentWillReceiveProps(props) {

    }
    getProjectsForRender(arr, justImportant) {
        return arr.filter(v => justImportant ? v.important : true).map(v => v.name).join("\n")
    }
    handleChange = (e,v) => {
        
        this.setState((state, props) => {
            const tempState = { ...state, [e]:v};
            const calc = new TeamCost(10000, 5000);
            const cost = calc.calculate(tempState.teamsize, tempState.teamcount);
            
            const deliveryCalc = new TeamDelivery();
            
            const projects = tempState.projects.split("\n").map(v => ProjectParser.fromString(v));
            const data = deliveryCalc.calculate(tempState.teamsize, tempState.teamcount, projects, tempState.efficiency);
            //const {now, next, soon, later, never} = data;
            const now = this.getProjectsForRender(data.now.tasks, tempState.important);//.map(v => v.name).join("\n");
            const next = data.next.tasks.map(v => v.name).join("\n");
            const soon = data.soon.tasks.map(v => v.name).join("\n");
            const later = data.later.tasks.map(v => v.name).join("\n");
            const never = data.never.tasks.map(v => v.name).join("\n");
           

            return {[e]:v, cost: cost, now: now, next: next, soon: soon, later: later, never};
        });

        //this.handleSubmit();
    }
    handleSubmit() {
        /*const calc = new TeamCost(10000, 5000);
        const output = calc.calculate(this.state.teamsize, this.state.teamcount);
        this.setState({cost: output}); */
    }
    render() {
        
        

        return (
        <React.Fragment>

        <div className="App">
          <header className="App-header">
          <form>
                <h1>Input</h1>
                <FormRowSlider id="teamsize" label="Developers per Team" min="1" max="7" value={this.state.teamsize} handleChange={this.handleChange} />
                <FormRowSlider id="teamcount" label="Number of Teams" min="1" max="7" value={this.state.teamcount} handleChange={this.handleChange} />
                <FormRowSlider id="efficiency" label="Efficiency" min="10" max="100" step="5" value={this.state.efficiency} handleChange={this.handleChange} />
                
                <FormRowTextArea type="textarea" id="projects" label="Projects" value={this.state.projects} handleChange={this.handleChange} />

                <FormRowOptions type="radio" id="important" label="View Only Important tasks" value={this.state.important} handleChange={this.handleChange} />

                <button type="button" className="btn btn-primary">Update</button>
                <hr />
               
                
                
            </form>
          </header>
        </div>
        <main>
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
        
        </React.Fragment>
        );
    }
}