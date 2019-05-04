import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { TeamSlider } from "./views/TeamSlider";
import { Calendar } from "./views/Calendar";
import { MenuList, MenuItem, Popper, Grow, Paper, ClickAwayListener, Fab } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export class AppHolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuItems: [
        { name: "Team Slider", path: "/TeamSlider", component: TeamSlider },
        { name: "Calendar", path: "/Calendar", component: Calendar }
      ],
      selectedIndex: -1,
      open: false
    }
    this.anchorRef = React.createRef();
  }

  handleToggleMenu = () => {
    this.setState(state => {
      return { open: !state.open }
    });
  }

  handleCloseMenu = (event) => {
    if (this.anchorRef.current && this.anchorRef.current.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  }

  handleSelected = (e, i) => {
    this.setState({
      selectedIndex: i,
      open: false
    });
  }
  render() {
    const handleCloseMenu = this.handleCloseMenu,
      selectedIndex = this.state.selectedIndex,
      handleSelected = this.handleSelected;
    return (
      <Router>


        <Fab variant="extended" aria-label="Menu"
            ref={this.anchorRef}
            aria-owns={this.state.open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={this.handleToggleMenu}>
            <MenuIcon />
            Menu
        </Fab>


        <Popper 
          open={this.state.open} 
          anchorEl={this.anchorRef.current} 
          transition disablePortal>
          {({TransitionProps}) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: 'center bottom' }}
            >
              <Paper id="menu-list-grow">
                <ClickAwayListener onClickAway={handleCloseMenu}>
                  <MenuList>
                    {this.state.menuItems.map((item, index) => (
                      <MenuItem 
                        key={"menu-" + index} 
                        onClick={event => handleSelected(event, index)} 
                        selected={selectedIndex === index} 
                        component={Link} 
                        to={item.path} >{item.name}</MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {this.state.menuItems.map((item, index) => (
          <Route key={"route-" + index} path={item.path} component={item.component} />
        ))}
      </Router>
    );

  }
}