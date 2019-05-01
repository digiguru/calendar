import React, { Component } from 'react';
//import {PeopleData} from './PeopleData'
export class PeopleRow extends Component {

  render() {

      return this.props.data.map(row => {
          return <tr key={row.person}>
                    <th scope="row">{row.person}</th>
                    {row.data.map((item, index) => {
                        return <td key={row.person + "-" + index} onClick={this.props.onEditProject}>{item}</td>;
                    })}
                </tr>;
          });
      };
  }

