import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import { StateContext } from "../../librarys/context";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: grid;

  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 12fr 1fr;

  transition: opacity 0.2s;

  &.disable {
    opacity: 0;
  }
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);

  &.disable {
    background: none;
  }
`;

const BorderBox = () => {
  const { blackBox } = useContext(StateContext);
  return (
    <Container className={blackBox ? null : "disable"}>
      <Box />
      <Box />
      <Box />
      <Box />
      <Box className="disable" />
      <Box />
      <Box />
      <Box />
      <Box />
    </Container>
  );
};

export default BorderBox;
