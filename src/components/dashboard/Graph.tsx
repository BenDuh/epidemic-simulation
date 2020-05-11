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
      width: this.props.statsGraph.none * 4,
      backgroundColor: ESColors.none,
    };
    const infectedStyle = {
      width: this.props.statsGraph.infected * 4,
      backgroundColor: ESColors.infected,
    };
    const recoveredStyle = {
      width: this.props.statsGraph.recovered * 4,
      backgroundColor: ESColors.recovered,
    };
    const deathStyle = {
      width: this.props.statsGraph.death * 4,
      backgroundColor: ESColors.death,
    };
    return (
      <div className="containerTotalGraph">
        <div className="containerGraph">
          {this.props.statsGraph.none ? (
            <div className="graph" style={noneStyle} />
          ) : (
            <Fragment />
          )}
          {this.props.statsGraph.infected ? (
            <div className="graph" style={infectedStyle} />
          ) : (
            <Fragment />
          )}
          {this.props.statsGraph.recovered ? (
            <div className="graph" style={recoveredStyle} />
          ) : (
            <Fragment />
          )}
          {this.props.statsGraph.death ? (
            <div className="graph" style={deathStyle} />
          ) : (
            <Fragment />
          )}
        </div>
        <div className="legend">
          <div className="legendItem">
            <div className="icon" style={{ backgroundColor: ESColors.none }} />
            <p className="descrip">
              not infected {this.props.statsGraph.none}%
            </p>
          </div>
          <div className="legendItem">
            <div
              className="icon"
              style={{ backgroundColor: ESColors.infected }}
            />
            <p className="descrip">
              infected {this.props.statsGraph.infected}%
            </p>
          </div>
          <div className="legendItem">
            <div
              className="icon"
              style={{ backgroundColor: ESColors.recovered }}
            />
            <p className="descrip">
              recovered {this.props.statsGraph.recovered}%
            </p>
          </div>
          <div className="legendItem">
            <div className="icon" style={{ backgroundColor: ESColors.death }} />
            <p className="descrip">death {this.props.statsGraph.death}%</p>
          </div>
        </div>
      </div>
    );
  }
}
