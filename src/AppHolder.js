import React, {Component} from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { TeamSlider } from "./views/TeamSlider";
import { App } from "./App";
import { About } from './About';

export class AppHolder extends Component {
  render() {
    const location = this.props.location;
    console.log(location)
    return (
      <Router>
        <div>
          <div className="pos-f-t">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav"> 
                <NavLink activeClassName="selected" className="nav-item nav-link" to="/">
                About
                </NavLink>
                <NavLink activeClassName="selected" className="nav-item nav-link" to="/slider">Slider</NavLink>
                <NavLink activeClassName="selected" className="nav-item nav-link" to="/settings">Settings</NavLink>
              
            </ul>
          
              
              
              
          </nav>

        </div> 


          <Route exact path="/slider" component={TeamSlider} />
          <Route path="/settings" component={App} />
          <Route path="/" component={About} />
        </div>
      </Router>
    );
  }
  
}