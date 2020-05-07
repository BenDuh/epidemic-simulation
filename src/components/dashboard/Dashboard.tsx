import React, { Component } from "react";
import "../../styles/App.css";
import Graph from "./Graph";
import StatsGraph from "../../models/StatsGraph";

interface Props {
  statsGraph: StatsGraph;
}

interface State {}

export default class Dashboard extends Component<Props, State> {
  render() {
    return (
      <div className="containerDashboard">
        <Graph statsGraph={this.props.statsGraph} />
        <p className="title">Social distancing</p>
        <div>
            <button className='button'>low</button>
            <button className='button'>medium</button>
            <button className='button'>hard</button>
        </div>
      </div>
    );
  }
}
