import React, { Component } from 'react';
import { FormRowHolder } from './FormRowHolder';
export class FormRowInput extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        return (<FormRowHolder {...this.props}>
            <input id={this.props.id} type={this.props.type} className="form-control" onChange={(e) => this.props.handleChange(this.props.id, e.target.value)} defaultValue={this.props.value} {...inputOptions} {...this.props} />
        </FormRowHolder>);
    }
}
