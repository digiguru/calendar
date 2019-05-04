import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TeamSlider } from "./views/TeamSlider";
import { Calendar } from "./views/Calendar";
import { MenuList, MenuItem, Popper, Grow, Paper, ClickAwayListener, Fab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export class AppHolder_basic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1
        }
       
    }
    handleMenuClose() {

    }
    handleSelected = (e,i) => {
        console.log("boom", e,i);
        this.setState({selectedIndex: i});
        this.handleMenuClose();
    }
    render() {
        return (
            <Router>
    
        <MenuList>
            <MenuItem  selected={this.state.selectedIndex === 0} onClick={event => this.handleSelected(event, 0)} component={Link} to="/TeamSlider">One</MenuItem>
            <MenuItem  selected={this.state.selectedIndex === 1} onClick={event => this.handleSelected(event, 1)} component={Link} to="/Calendar">Two</MenuItem>

        </MenuList>


        <Route path="/TeamSlider" component={TeamSlider} />
        <Route path="/Calendar" component={Calendar} />
   
                



            </Router>
          );
        
    }
}