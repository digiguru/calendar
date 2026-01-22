import React, {Component} from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import { TeamSlider } from "./views/TeamSlider";
import { App } from "./App";
import { About } from './About';

export class AppHolder extends Component {
  render() {
    const navLinkClassName = ({ isActive }) =>
      `nav-item nav-link${isActive ? " selected" : ""}`;
    return (
      <Router>
        <div>
          <div className="pos-f-t">
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav"> 
                <NavLink className={navLinkClassName} to="/">
                About
                </NavLink>
                <NavLink className={navLinkClassName} to="/slider">Slider</NavLink>
                <NavLink className={navLinkClassName} to="/settings">Settings</NavLink>
              
            </ul>
          
              
              
              
          </nav>

        </div> 
          <Routes>
            <Route path="/slider" element={<TeamSlider />} />
            <Route path="/settings" element={<App />} />
            <Route path="/" element={<About />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
}
