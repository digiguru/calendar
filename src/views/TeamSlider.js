import React, { Component } from 'react';
import { FormRow, FormRowTextArea, FormRowSlider, FormRowOptions } from './ProjectDetails/FormRow';
import { TeamCost } from '../logic/TeamCost';
import { TeamDelivery } from '../logic/TeamDelivery';
import { ProjectParser } from "../logic/ProjectParser";


export class TeamSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamsize: 3,
            teamcount:2,
            cost: 10000,
            projects: "Some task - S\nSome other task - S",
            efficiency: 100,
            important: false
        }
        
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
        
        

        return <form>
                <h1>Input</h1>
                <FormRowSlider id="teamsize" label="Developer Count" min="1" max="7" value={this.state.teamsize} handleChange={this.handleChange} />
                <FormRowSlider id="teamcount" label="Number of Team" min="1" max="7" value={this.state.teamcount} handleChange={this.handleChange} />
                <FormRowSlider id="efficiency" label="Efficiency" min="10" max="100" step="5" value={this.props.efficiency} handleChange={this.handleChange} />
                
                <FormRowTextArea type="textarea" id="projects" label="Projects" value={this.state.projects} handleChange={this.handleChange} />

                <FormRowOptions type="radio" id="important" label="View Only Important tasks" value={this.state.important} handleChange={this.handleChange} />

                <button type="button" className="btn btn-primary">Update</button>
                <hr />
                <h1>Output</h1>

                <FormRow type="number" step="any" id="cost" label="Monthly Cost" value={this.state.cost} />
                <FormRowTextArea type="textarea" id="week" label="Now (1 week)" readonly={true} value={this.state.now} />
                <FormRowTextArea type="textarea" id="month" label="Next (+1 month)" readonly={true} value={this.state.next} />
                <FormRowTextArea type="textarea" id="quarter" label="Soon (+1 quarter)" readonly={true} value={this.state.soon} />
                <FormRowTextArea type="textarea" id="annual" label="Later (+1 year)" readonly={true} value={this.state.later} />
                <FormRowTextArea type="textarea" id="never" label="Unlikely (everything else)" readonly={true} value={this.state.never} />
                
                
                
            </form>;
    }
}