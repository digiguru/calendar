import React, { Component } from 'react';
import { FormRowHolder } from './FormRowHolder';
import { Paper } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
export class FormRowSlider extends Component {
    handleSlide = (event, value) => {
        console.log("handleSlide", event, value);
        //this.setState({ value: newValue });
        if (typeof this.props.handleChange === "function") {
            this.props.handleChange(this.props.id, value);
        }
    };
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        console.log("Slider", this.props.value);
        return (<FormRowHolder {...this.props}>
                <Slider
                    value={this.props.value}
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    onChange={(e, v) => this.handleSlide(e, v)}
                />
                <Paper>
                    {this.props.value}
                </Paper>
        </FormRowHolder>);




    }
}
