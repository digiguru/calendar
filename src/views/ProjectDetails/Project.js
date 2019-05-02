import React, { Component } from 'react';
import { FormRowInput } from "../FormElements/FormRowInput";
export class Project extends Component {
    

    componentWillReceiveProps(props) {
    
    }

    render() {
        return <form>
                <FormRowInput type="text" id="unique" label="unique" value={this.props.unique} />
                <FormRowInput type="text" id="name" label="Name" value={this.props.name} />
                <FormRowInput type="text" id="efficency" label="Development Efficency" value={this.props.efficency} />
                <FormRowInput type="text" id="capacity" label="Capacity" value={this.props.capacity} readonly={true} />
                <hr />
                <FormRowInput type="number" id="estimate" label="Next Estimate" value={this.props.estimate} />
                <FormRowInput type="date" id="startDate" label="Start Date" value={this.props.startDate} />
                <FormRowInput type="date" id="readyDate" label="Ready Date" value={this.props.readyDate} />
                <button type="button" className="btn btn-primary">Save</button>
            </form>;
    }
}