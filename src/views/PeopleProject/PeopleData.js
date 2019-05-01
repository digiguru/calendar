import React, { Component } from 'react';

export class PeopleData extends Component {
  render() {
      return this.props.data.map(item => {
          return <td>{item}</td>;
          });
      };
  }


