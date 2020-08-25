import React, { Component } from "react";
import "./styles/App.css";
import Graphic from "./components/scenes/graphic/Graphic";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #212523;
  height: 100vh;
`;

export default class App extends Component {
  render() {
    return (
      <Container>
        <Graphic />
      </Container>
    );
  }
}
