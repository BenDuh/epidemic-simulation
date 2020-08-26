import React from "react";
import styled from "styled-components";
import ESColors from "../../ressources/ESColors";

const Input = styled.input`
  -webkit-appearance: none;
  margin: 10px 0;
  background: transparent;
  width: 100%;
  &:focus {
    outline: none;
  }
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 15px;
    cursor: pointer;
    background: ${ESColors.none};
    border-radius:3px;
  }
  &::-webkit-slider-thumb {
    border: 0px solid #000000;
    height: 20px;
    border-radius: 5px;
    width: 20px;
    background: ${ESColors.darkGrey};
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -2.5px;
  }
  &:focus::-webkit-slider-runnable-track {
    background: ${ESColors.none};
  }
  &::-moz-range-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    background: ${ESColors.none};
    border-radius: 25px;
    border: 0px solid #000101;
  }
  &::-moz-range-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: ${ESColors.none};
    cursor: pointer;
  }
  &::-ms-track {
    width: 100%;
    height: 12.8px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 39px 0;
    color: transparent;
  }
  &::-ms-fill-lower {
    background: ${ESColors.none};
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  &::-ms-fill-upper {
    background: ${ESColors.none};
    border: 0px solid #000101;
    border-radius: 50px;
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
  }
  &::-ms-thumb {
    box-shadow: 0px 0px 0px #000000, 0px 0px 0px #0d0d0d;
    border: 0px solid #000000;
    height: 20px;
    width: 39px;
    border-radius: 7px;
    background: ${ESColors.none};
    cursor: pointer;
  }
  &:focus::-ms-fill-lower {
    background: ${ESColors.none};
  }
  &:focus::-ms-fill-upper {
    background: ${ESColors.none};
  }
`;

interface Props {
  value: number;
  onChange: (e: any) => void;
  min: number;
  max: number;
}

export const ESInput = ({ min, max, value, onChange }: Props) => {
  return (
    <Input type="range" min={min} max={max} value={value} onChange={onChange} />
  );
};
