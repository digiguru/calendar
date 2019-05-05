import React, { Component } from 'react';

export class TabSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: props.activeTab
            //tabs: props.tabs
        }
    }
    handleClick = (e, i) => {
        e.preventDefault();
        const tabName = e.currentTarget.innerText;
        const tabIndex = v;
        this.setState({activeTab: tabName});
        this.props.handleChangeTab(tabName, i);
    };
    render() {
        return (
        <ul className="nav nav-tabs">
            {this.props.tabs.map((tab, index) => {
                return (
                    <li className="nav-item" key={tab.name + "-" + index}>
                        <button type="button" className={this.state.activeTab === tab.name ? "nav-link active" : "nav-link"} onClick={this.handleClick}>{tab.name}</button>
                    </li>
                );
            })}
        </ul>
        );
    }
}