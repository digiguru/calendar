import React, { Component } from 'react';

export class TabSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab
            //tabs: props.tabs
        }
    }
    handleClick = (e) => {
        e.preventDefault();
        const tabName = e.currentTarget.innerText;
        this.setState({activeTab: tabName});
        console.log("HELLO", tabName);
        this.props.handleChangeTab(tabName);

    };
    render() {
        return (
        <ul className="nav nav-tabs">
            {this.props.tabs.map((tab, index) => {
                return (
                    <li className="nav-item" key={tab.name + "-" + index}>
                        <a className={this.state.activeTab === tab.name ? "nav-link active" : "nav-link"} href="#" onClick={this.handleClick}>{tab.name}</a>
                    </li>
                );
            })}
        </ul>
        );
    }
}