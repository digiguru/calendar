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

export class FormCollapsedHolder extends Component {
    render() {
        return (
        <div className="form-group">
            <label htmlFor={this.props.id}>{this.props.label}</label>                    
            <div>
                {this.props.children}
            </div>
        </div>
        );
    }
}
