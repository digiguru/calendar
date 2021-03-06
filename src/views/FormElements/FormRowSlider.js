import React, { Component } from 'react';
import { FormRowHolder } from './FormRowHolder';
export class FormRowSlider extends Component {
    handleSlide = (event) => {
        const newValue = event.target.value;
        //this.setState({ value: newValue });
        if (typeof this.props.handleChange === "function") {
            this.props.handleChange(this.props.id, newValue);
        }
    };
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        return (<FormRowHolder {...this.props}>
            <div className="row">
                <input id={this.props.id} type="range" className="col-sm-6 form-control" onChange={(e) => this.handleSlide(e)} value={this.props.value} min={this.props.min} max={this.props.max} step={this.props.step} />
                <span className="col-sm-1">{this.props.value}</span>
            </div>
        </FormRowHolder>);
    }
}
