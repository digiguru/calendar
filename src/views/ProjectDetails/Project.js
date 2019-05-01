import React, { Component } from 'react';
import { FormRow } from './FormRow';
export class Project extends Component {
    componentWillReceiveProps(props) {
    
    }

    render() {
        return <form>
                <FormRow type="text" id="unique" label="unique" value={this.props.unique} />
                <FormRow type="text" id="name" label="Name" value={this.props.name} />
                <FormRow type="text" id="efficency" label="Development Efficency" value={this.props.efficency} />
                <FormRow type="text" id="capacity" label="Capacity" value={this.props.capacity} readonly={true} />
                <hr />
                <FormRow type="number" id="estimate" label="Next Estimate" value={this.props.estimate} />
                <FormRow type="date" id="startDate" label="Start Date" value={this.props.startDate} />
                <FormRow type="date" id="readyDate" label="Ready Date" value={this.props.readyDate} />
                <button type="button" className="btn btn-primary">Save</button>
            </form>;
    }
}