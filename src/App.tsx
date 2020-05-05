import React, { Component } from "react";
import "./styles/App.css";
import Graphic from "./components/graphic/Graphic";

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <Graphic/>
      </div>
    );
  }
}