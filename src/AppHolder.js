import React, { Component } from "react";
import { MainMenu } from "./views/MainMenu";
import { TeamSlider } from "./views/TeamSlider";
import { Calendar } from "./views/Calendar";
import Heatmap from "./views/Heatmap";
export class AppHolder extends Component {
  render() {
    return (
      <MainMenu menuItems={this.props.menuItems} />
    );

  }
}
AppHolder.defaultProps = {
  menuItems: [
    { name: "Team Slider", path: "/TeamSlider", component: TeamSlider },
    { name: "Calendar", path: "/Calendar", component: Calendar },
    { name: "Heatmap", path: "/Heatmap", component: Heatmap}
  ]
}