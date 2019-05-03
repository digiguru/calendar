import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TeamSlider } from "./views/TeamSlider";
import { App } from "./App";

export function AppHolder() {
  return (
    <Router>
      <div>
        <div className="pos-f-t">
        <nav className="navbar navbar-dark bg-dark">
            <div className="navbar-nav mr-auto mt-2 mt-lg-0">
            <span c>
             <Link className="btn btn-secondary" to="/TeamSlider">TeamSlider</Link>
            </span>
            <span className="nav-item">
             <Link className="btn btn-secondary" to="/about">About</Link>
            </span>
            </div>
        </nav>

      </div> 


        <Route exact path="/TeamSlider" component={TeamSlider} />
        <Route path="/about" component={App} />
      </div>
    </Router>
  );
}