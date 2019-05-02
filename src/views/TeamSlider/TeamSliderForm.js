import React, { Component } from 'react';
import { FormRowSlider } from "../FormElements/FormRowSlider";
import { FormRowOptions } from "../FormElements/FormRowOptions";
import { FormRowTextArea } from "../FormElements/FormRowTextArea";


export class TeamSliderForm extends Component {

    render() {
        return (
        <form>
            <h1>Input</h1>
            <FormRowSlider id="teamsize" label="Developers per Team" min="1" max="7" value={this.props.project.teamsize} handleChange={this.props.handleChange} />
            <FormRowSlider id="teamcount" label="Number of Teams" min="1" max="7" value={this.props.project.teamcount} handleChange={this.props.handleChange} />
            <FormRowSlider id="efficiency" label="Efficiency" min="10" max="100" step="5" value={this.props.project.efficiency} handleChange={this.props.handleChange} />
            
            <FormRowTextArea type="textarea" id="projects" label="Projects" value={this.props.project.projects} handleChange={this.props.handleChange} />

            <FormRowOptions type="radio" id="important" label="View Only Important tasks" value={this.props.project.important} handleChange={this.props.handleChange} />
            <div>
            <button type="button" className={((this.props.activeProject) ? "btn btn-primary mr-2" : "d-none")} onClick={this.props.handleSave}>Save {this.props.activeProject}</button>
            <button type="button" className="btn btn-outline-primary" onClick={this.props.handleSaveAs}>{this.props.activeProject ? "Save a copy..." : "Save"}</button>
            </div>
            <hr />
        </form>
        );
    }
}