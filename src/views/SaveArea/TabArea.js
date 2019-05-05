import React, { Component } from 'react';
import { AppBar, Tabs, Tab} from '@material-ui/core';


  

export class TabArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab,
            activeIndex: 0
            //tabs: props.tabs
        }
    }
    
    handleClick = (e, i) => {
        console.log("hello");
        e.preventDefault();
        const tabName = e.currentTarget.outerText;
        this.setState({activeTab: tabName, activeIndex: i});
        this.props.handleChangeTab(tabName, i);
    };
    render() {
        return (
              <AppBar position="static" color="default">
                <Tabs
                  value={this.state.activeIndex}
                  onChange={(e, i) => this.handleClick(e, i)}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                 {this.props.tabs.map((tab, index) => {
                    return (<Tab key={"tab-" + index} label={tab.name} />);
                 })}
                
                </Tabs>
              </AppBar>
          );
        
    }

}
