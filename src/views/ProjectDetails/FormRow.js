import React, { Component } from 'react';

export class FormRowHolder extends Component {
    render() {
        return (
        <div className="form-group row">
            <label htmlFor={this.props.id} className="col-sm-2 col-form-label-sm">{this.props.label}</label>                    
            <div className="col-sm-10">
                {this.props.children}
            </div>
        </div>
        );
    }
}
export class FormRowSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }
    handleSlide = (event) => {
        const newValue = event.target.value;
        this.setState({value: newValue});
        if(typeof this.props.handleChange === "function") {
            this.props.handleChange(this.props.id, newValue);
        }
          
    }
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        
        return (
        <FormRowHolder {... this.props} >
            <div className="row">
                <input id={this.props.id} type="range" className="col-sm-6 form-control" onChange={(e) => this.handleSlide(e)} defaultValue={this.state.value} min={this.props.min} max={this.props.max} step={this.props.step} />
                <span className="col-sm-1">{this.state.value}</span>
            </div>
        </FormRowHolder>
        );
    }
}
export class FormRowOptions extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            value: props.value,
            onClassName: "btn btn-secondary",
            offClassName: "btn btn-secondary active"
        };
    }
    handleToggle = (id, value) => {
        const newValue = value;
        const active = "btn btn-secondary active";
        const inactive = "btn btn-secondary";
        
        this.setState({value: newValue, activeClassName: newValue ? active : inactive, inActiveClassName: newValue? inactive : active });
        if(typeof this.props.handleChange === "function") {
            this.props.handleChange(id, newValue);
        }
    }
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        if (this.state.value) {

        }
        return (
        <FormRowHolder {... this.props} >
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className={this.state.onClassName}>
                    <input type="radio" name="options" id={this.props.id + "-on"} onChange={(e) => this.handleToggle(this.props.id, true)} checked={this.state.value} /> Important Tasks
                </label>
                <label className={this.state.offClassName}>
                    <input type="radio" name="options" id={this.props.id + "-off"} onChange={(e) => this.handleToggle(this.props.id, false)} checked={!this.state.value}/> All Tasks
                </label>
            </div>
        </FormRowHolder>
        );
    }
}
export class FormRowTextArea  extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }
    
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        return (
        <FormRowHolder {... this.props} >
            <textarea id={this.props.id} className="form-control" cols="40" rows="5" value={this.props.value} onChange={(e) => this.props.handleChange(this.props.id, e.target.value)} {...inputOptions}></textarea>                
        </FormRowHolder>
        );
    }
}

export class FormRow extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        return (
        <FormRowHolder {... this.props} >
            <input id={this.props.id} type={this.props.type} className="form-control" onChange={(e) => this.props.handleChange(this.props.id, e.target.value)} defaultValue={this.props.value} {...inputOptions} {...this.props} />
        </FormRowHolder>
        );
    }
}