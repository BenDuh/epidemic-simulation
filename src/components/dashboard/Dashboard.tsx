import React, { Component } from "react";
import "../../styles/App.css";
import Graph from "./Graph";
import StatsGraph from "../../models/StatsGraph";
import DistancingSocial from "../../models/DistancingSocial";

interface Props {
  statsGraph: StatsGraph;
  changeDistSoc: (distancingSocial: DistancingSocial) => void;
}

interface State {}

export default class Dashboard extends Component<Props, State> {
  render() {
    return (
      <div className="containerDashboard">
        <Graph statsGraph={this.props.statsGraph} />
        <p className="title">Social distancing</p>
        <div className="containerButton">
          <button
            className="button"
            onClick={() => this.props.changeDistSoc(DistancingSocial.low)}
          >
            low
          </button>
          <button
            className="button"
            onClick={() => this.props.changeDistSoc(DistancingSocial.medium)}
          >
            medium
          </button>
          <button
            className="button"
            onClick={() => this.props.changeDistSoc(DistancingSocial.hard)}
          >
            hard
          </button>
        </div>
      </div>
    );
  }
}
