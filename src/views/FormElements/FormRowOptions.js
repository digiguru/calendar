import React, { Component } from 'react';
import { FormRowHolder } from './FormRowHolder';
export class FormRowOptions extends Component {
   
    constructor(props) {
        super(props);
        this.activeClass = "btn btn-secondary active";
        this.inactiveClass = "btn btn-secondary";
        this.state = {
            value: props.value,
            onClassName: this.inactiveClass,
            offClassName: this.activeClass
        };
    }
    handleToggle = (id, value) => {
        const newValue = value;
        
        this.setState({ 
            value: newValue, 
            onClassName: newValue ? this.activeClass : this.inactiveClass, 
            offClassName: newValue ? this.inactiveClass : this.activeClass 
        });

        //If a handleChange is passed in then use it!
        if (typeof this.props.handleChange === "function") {
            this.props.handleChange(id, newValue);
        }
        
    };
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        
        return (<FormRowHolder {...this.props}>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={this.state.onClassName}>
                    <input type="radio" name="options" id={this.props.id + "-on"} onChange={(e) => this.handleToggle(this.props.id, true)} checked={this.state.value} /> Important Tasks
                </label>
                <label className={this.state.offClassName}>
                    <input type="radio" name="options" id={this.props.id + "-off"} onChange={(e) => this.handleToggle(this.props.id, false)} checked={!this.state.value} /> All Tasks
                </label>
            </div>
        </FormRowHolder>);
    }
}
