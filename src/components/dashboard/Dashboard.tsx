import React, { Component } from "react";
import "../../styles/App.css";
import Graph from "./Graph";
import StatsGraph from "../../models/StatsGraph";
import DistancingSocial from "../../models/DistancingSocial";
import ESColors from "../../ressources/ESColors";
import LevelInfection from "../../models/LevelInfection";

interface Props {
  statsGraph: StatsGraph;
  distancingSocial: DistancingSocial;
  changeDistSoc: (distancingSocial: DistancingSocial) => void;
  levelInfection: LevelInfection;
  changeLevelInfection: (levelInfection: LevelInfection) => void;
}

interface State {}

export default class Dashboard extends Component<Props, State> {
  render() {
    const activeStyle = {
      backgroundColor: "white",
      color: ESColors.darkGrey,
    };
    const notActiveStyle = {
      backgroundColor: ESColors.darkGrey,
      color: "white",
    };
    return (
      <div className="containerDashboard">
        <Graph statsGraph={this.props.statsGraph} />
        <p className="title">Social distancing</p>
        <div className="containerButton">
          <button
            className="button"
            onClick={() => this.props.changeDistSoc(DistancingSocial.low)}
            style={
              this.props.distancingSocial === DistancingSocial.low
                ? activeStyle
                : notActiveStyle
            }
          >
            low
          </button>
          <button
            className="button"
            onClick={() => this.props.changeDistSoc(DistancingSocial.medium)}
            style={
              this.props.distancingSocial === DistancingSocial.medium
                ? activeStyle
                : notActiveStyle
            }
          >
            medium
          </button>
          <button
            className="button"
            onClick={() => this.props.changeDistSoc(DistancingSocial.hard)}
            style={
              this.props.distancingSocial === DistancingSocial.hard
                ? activeStyle
                : notActiveStyle
            }
          >
            hard
          </button>
        </div>
        <p className="title">Infection level</p>
        <div className="containerButton">
          <button
            className="button"
            onClick={() => this.props.changeLevelInfection(LevelInfection.low)}
            style={
              this.props.levelInfection === LevelInfection.low
                ? activeStyle
                : notActiveStyle
            }
          >
            low
          </button>
          <button
            className="button"
            onClick={() =>
              this.props.changeLevelInfection(LevelInfection.medium)
            }
            style={
              this.props.levelInfection === LevelInfection.medium
                ? activeStyle
                : notActiveStyle
            }
          >
            medium
          </button>
          <button
            className="button"
            onClick={() => this.props.changeLevelInfection(LevelInfection.hard)}
            style={
              this.props.levelInfection === LevelInfection.hard
                ? activeStyle
                : notActiveStyle
            }
          >
            hard
          </button>
        </div>
      </div>
    );
  }
}
