
import React, { Component } from 'react';
import {ProjectHeaderCell} from './ProjectHeaderCell';

export class ProjectHeader extends Component {
    render() {
      return (
        <React.Fragment>
          {this.props.items.map(v => {
            return <ProjectHeaderCell onEditProject={this.props.onEditProject} key={"head-"+v} name={v} />;
          })}
        </React.Fragment>
      );
    }
  }
