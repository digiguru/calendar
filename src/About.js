import React, { Component } from 'react';
export class About extends Component {
  
  render() {
    //const reRender = !!this.state.project;
    return (
      <React.Fragment>

      <div className="App">
        <header className="App-header">
          <h1>About this project</h1>
        </header>
      </div>
      <main>
        This tool was developed to show how throwing 'resources' at a pool of ideas is not the way to deliver those ideas faster. The best way to 'parallelise' work is to split it into separate streams of work (not architecturally but by the overall vision of the streams).
      </main>
      
      </React.Fragment>
      
    );
  }
}
