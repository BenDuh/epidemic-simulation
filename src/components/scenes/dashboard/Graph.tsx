import React from "react";
import StatsGraph from "../../../models/StatsGraph";
import ESColors from "../../../ressources/ESColors";
import styled from "styled-components";
import ESLegendItem from "../../UI/ESLegendItem";

const ContainerTotalGraph = styled.div`
  width: 400px;
  margin-bottom:10px;
`;

const GraphContainer = styled.div<{ width: number; color: ESColors }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  height: 30px;
  transition: all 0.5s ease;
  width: ${(props) => props.width * graphDimension}px;
  background-color: ${(props) => props.color};
`;

const ContainerGraph = styled.div`
  width: 400px;
  margin-bottom: 25px;
  display: flex;
  height: 30px;
  background-color: white;
  position: relative;
`;

const Legend = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 420px;
`;

interface Props {
  statsGraph: StatsGraph;
}

const graphDimension: number = 16;

const Graph = ({ statsGraph }: Props) => {
  const noneStyle = {
    right:
      statsGraph.infected * graphDimension +
      statsGraph.recovered * graphDimension +
      statsGraph.death * graphDimension,
  };
  const infectedStyle = {
    right:
      statsGraph.recovered * graphDimension + statsGraph.death * graphDimension,
  };
  const recoveredStyle = {
    right: statsGraph.death * graphDimension,
  };
  const mainBgColor = {
    backgroundColor:
      statsGraph.none > statsGraph.infected
        ? ESColors.none
        : statsGraph.infected > statsGraph.recovered
        ? ESColors.infected
        : ESColors.recovered,
  };
  return (
    <ContainerTotalGraph>
      <ContainerGraph style={mainBgColor}>
        <GraphContainer
          width={statsGraph.none}
          color={ESColors.none}
          style={noneStyle}
        />
        <GraphContainer
          width={statsGraph.infected}
          color={ESColors.infected}
          style={infectedStyle}
        />
        <GraphContainer
          width={statsGraph.recovered}
          color={ESColors.recovered}
          style={recoveredStyle}
        />
        <GraphContainer width={statsGraph.death} color={ESColors.death} />
      </ContainerGraph>
      <Legend>
        <ESLegendItem
          color={ESColors.none}
          text="not infected"
          percent={statsGraph.none}
        />
        <ESLegendItem
          color={ESColors.infected}
          text="infected"
          percent={statsGraph.infected}
        />
        <ESLegendItem
          color={ESColors.recovered}
          text="recovered"
          percent={statsGraph.recovered}
        />
        <ESLegendItem
          color={ESColors.death}
          text="death"
          percent={statsGraph.death}
        />
      </Legend>
    </ContainerTotalGraph>
  );
};

export default Graph;
