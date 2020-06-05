import React, { Component, Fragment } from "react";
import "../../styles/App.css";
import StatsGraph from "../../models/StatsGraph";
import ESColors from "../../ressources/ESColors";

interface Props {
  statsGraph: StatsGraph;
}

interface State {}

export default class Graph extends Component<Props, State> {
  render() {
    const noneStyle = {
      width: this.props.statsGraph.none * 8,
      backgroundColor: ESColors.none,
      right:
        this.props.statsGraph.infected * 8 +
        this.props.statsGraph.recovered * 8 +
        this.props.statsGraph.death * 8,
    };
    const infectedStyle = {
      width: this.props.statsGraph.infected * 8,
      backgroundColor: ESColors.infected,
      right:
        this.props.statsGraph.recovered * 8 + this.props.statsGraph.death * 8,
    };
    const recoveredStyle = {
      width: this.props.statsGraph.recovered * 8,
      backgroundColor: ESColors.recovered,
      right: this.props.statsGraph.death * 8,
    };
    const deathStyle = {
      width: this.props.statsGraph.death * 8,
      backgroundColor: ESColors.death,
    };
    const mainBgColor = {
      backgroundColor:
        this.props.statsGraph.none > this.props.statsGraph.infected
          ? ESColors.none
          : this.props.statsGraph.infected > this.props.statsGraph.recovered
          ? ESColors.infected
          : ESColors.recovered,
    };
    return (
      <div className="containerTotalGraph">
        <div className="containerGraph" style={mainBgColor}>
          <div className="graph" style={noneStyle} />
          <div className="graph" style={infectedStyle} />
          <div className="graph" style={recoveredStyle} />
          <div className="graph" style={deathStyle} />
        </div>
        <div className="legend">
          <div className="legendItem">
            <div className="icon" style={{ backgroundColor: ESColors.none }} />
            <p className="descrip">
              not infected {this.props.statsGraph.none * 2}%
            </p>
          </div>
          <div className="legendItem">
            <div
              className="icon"
              style={{ backgroundColor: ESColors.infected }}
            />
            <p className="descrip">
              infected {this.props.statsGraph.infected * 2}%
            </p>
          </div>
          <div className="legendItem">
            <div
              className="icon"
              style={{ backgroundColor: ESColors.recovered }}
            />
            <p className="descrip">
              recovered {this.props.statsGraph.recovered * 2}%
            </p>
          </div>
          <div className="legendItem">
            <div className="icon" style={{ backgroundColor: ESColors.death }} />
            <p className="descrip">death {this.props.statsGraph.death * 2}%</p>
          </div>
        </div>
      </div>
    );
  }
}
