import React from "react";
import styled from "styled-components";
import ESColors from "../../ressources/ESColors";

const LegendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 13px;
  width: 100px;
`;

const Icon = styled.div<{
  color: ESColors;
}>`
  width: 7px;
  height: 7px;
  margin-bottom: 4px;
  background-color: ${(props) => props.color};
`;

const Descrip = styled.div`
  font-family: "Jost";
  font-weight: 100;
  font-size: 11px;
`;

interface Props {
  color: ESColors;
  text: string;
  percent: number;
}

const ESLegendItem = ({ color, text, percent }: Props) => {
  return (
    <LegendItem>
      <Icon color={color} />
      <Descrip>
        {text} {percent * 4}%
      </Descrip>
    </LegendItem>
  );
};

export default ESLegendItem
