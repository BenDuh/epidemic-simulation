import React, { Component } from "react";
import "../../../styles/App.css";
import Graph from "./Graph";
import StatsGraph from "../../../models/StatsGraph";
import ESColors from "../../../ressources/ESColors";
import styled from "styled-components";
import ESTitle from "../../UI/ESTitle";
import { ESInput } from "../../UI/ESInput";

const ContainerDashboard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 60px;
  width: 400px;
`;

const ContainerInput = styled.div`
  margin-top: 10px;
  width: 100%;
`;

interface Props {
  statsGraph: StatsGraph;
  distancingSocial: number;
  changeDistSoc: (distancingSocial: number) => void;
  levelInfection: number;
  changeLevelInfection: (levelInfection: number) => void;
}

const Dashboard = ({
  statsGraph,
  distancingSocial,
  changeDistSoc,
  levelInfection,
  changeLevelInfection,
}: Props) => {
  return (
    <ContainerDashboard>
      <Graph statsGraph={statsGraph} />
      <ESTitle text="Social distancing" />
      <ContainerInput>
        <ESInput
          min={1}
          max={6}
          value={distancingSocial}
          onChange={(e) => changeDistSoc(parseInt(e.target.value))}
        />
      </ContainerInput>
      <ESTitle text="Contagiousness" />
      <ContainerInput>
        <ESInput
          min={1}
          max={14}
          value={levelInfection}
          onChange={(e) => changeLevelInfection(parseInt(e.target.value))}
        />
      </ContainerInput>
    </ContainerDashboard>
  );
};

export default Dashboard;
