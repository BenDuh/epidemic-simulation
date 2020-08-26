import React from "react";
import styled from "styled-components";

const Title = styled.p`
  margin-top: 20px;
  font-size: 22px;
  font-weight: 300;
`;

interface Props {
  text: string;
}

const ESTitle = ({ text }: Props) => {
  return <Title>{text}</Title>;
};

export default ESTitle;
