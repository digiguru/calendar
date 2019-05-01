import React, { Component } from 'react';
import { ProjectHeader } from './ProjectHeader';
import { PeopleRow } from './PeopleRow';

export class PeopleProject extends Component {
    render() {
      const data = this.props.items;
      const projects = [...new Set(data.map(v => v.project))];
      const people = [...new Set(data.map(v => v.person))];
      const cells = people.map(person => {
        return {person: person, data: projects.map(project => {
          const item = data.find(item => item.person === person && item.project === project);
          return item ? item.capacity : 0;
        })}
      });
      //const cells = this.props.items.map(
      return (
        <table className="table table-dark table-striped table-hover">
            <thead>
                <tr>
                    <th scope="col">
                    People
                    </th>
                    <ProjectHeader items={projects} onEditProject={this.props.onEditProject} />
                    <th>
                      <button onClick={this.props.onAddProject} className="btn btn-outline-light btn-sm">Add Project</button>
                    </th>
                </tr>
            </thead>
            <tbody>
              <PeopleRow data={cells}/>
              <tr>
                <td><button onClick={this.props.onAddPerson} className="btn btn-outline-light btn-sm">Add Person</button></td>
              </tr>
            </tbody>
        </table>
      );
    }
  }
