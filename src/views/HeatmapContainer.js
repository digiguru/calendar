import React, { Component } from "react";
import Heatmap from "./Heatmap";
export class HeatmapContainer extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
data: [
    {
        area: "Spain", data: [
            { domain: "Cost", value: "£", rating: 100 },
            { domain: "Distance", value: 1000, rating: 60 },
            { domain: "Language", value: "Spanish", rating: 50 }
        ]
    },
    {
        area: "Thailand", data: [
            { domain: "Cost", value: "£££", rating: 10 },
            { domain: "Distance", value: 5855, rating: 10 },
            { domain: "Language", value: "Thai", rating: 10 }
        ]
    },
    {
        area: "Wales", data: [
            { domain: "Cost", value: "£", rating: 100 },
            { domain: "Distance", value: 187, rating: 80 },
            { domain: "Language", value: "Spanish", rating: 50 }
        ]
    }
]
        }
    }
    handleAddDomain = (domain) => {
        this.setState(state => {
            return {...state, ...state.data.map(x => {
                x.data.push({ domain: domain, value: "Default Value from domain", rating: 50 })
                return {...x}
            })};
        });
    }
    handleAddArea = (area) => {
        this.setState(state => {
            console.log(state, state.data);
            const sample = state.data[0];
            const sampleAmend = sample.data.map(x => {
                return {...x, ...{value: "default value from area", rating: 50}}
            });
            state.data.push({
                area: area, 
                data: sampleAmend
            });
            return state;
        });
    }
    render() {
        const rawData = this.state.data;


        const domains = rawData[0].data.map(x => x.domain);

        const areas = rawData.map(x => x.area);
        const cells = [];
        areas.forEach((area, areaIndex) => {
            const g = rawData[areaIndex].data;
            const h = g.map(x => ({ rating: x.rating, value: x.value }));
            cells.push(h);
        });
        return (
            <Heatmap cells={cells} areas={areas} domains={domains} onAddDomain={this.handleAddDomain}  onAddArea={this.handleAddArea}  />
        );

    }
}
