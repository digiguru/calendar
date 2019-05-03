import React, {Component} from 'react'

export class CtrlS extends Component {

  constructor(props) {
    super(props);
    this.state = {
      saving : false
    }
    document.addEventListener('keydown', this.handleKeyDown);
  }
  save() {
    this.setState({saving:true});
    this.props.handleSave();
    window.setTimeout(() => {
      this.setState({saving:false});
      //$(".alert").close();
    }, 3000);
  }
  handleKeyDown = (event) => {
    let charCode = String.fromCharCode(event.which).toLowerCase();
    if(event.ctrlKey && charCode === 's') {
      event.preventDefault();
      console.log("Ctrl + S pressed");
      this.save();
    }
    // For MAC we can use metaKey to detect cmd key
    if(event.metaKey && charCode === 's') {
      event.preventDefault();
      console.log("Cmd + S pressed");
      this.save();
    }
  }

  render() {
    return (
         <div className={this.state.saving ? "alert alert-success show fade" : "d-none"} role="alert">Saving...</div>
    );
  }

}