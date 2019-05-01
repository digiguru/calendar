
import React, { Component } from 'react';
export class ProjectHeaderCell extends Component {
    render() {
      return (
        <th scope="col" onClick={this.props.onEditProject(this.props.name)}>{this.props.name}</th>
      );
    }
  }
