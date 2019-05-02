import React, { Component } from 'react';
import { FormRowHolder, FormCollapsedHolder } from './FormRowHolder';
export class FormRowTextArea extends Component {
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
            <textarea id={this.props.id} className="form-control" cols="40" rows="5" value={this.props.value} onChange={(e) => this.props.handleChange(this.props.id, e.target.value)} {...inputOptions}></textarea>
        </FormRowHolder>);
    }
}

export class FormColapsedTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = { value: props.value };
    }
    render() {
        var inputOptions = {};
        if (this.props.readonly) {
            inputOptions['readOnly'] = 'readOnly';
        }
        return (<FormCollapsedHolder {...this.props}>
            <textarea id={this.props.id} className="form-control" cols="40" rows="5" value={this.props.value} onChange={(e) => this.props.handleChange(this.props.id, e.target.value)} {...inputOptions}></textarea>
        </FormCollapsedHolder>);
    }
}