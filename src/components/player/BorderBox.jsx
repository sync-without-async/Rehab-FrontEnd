import { useContext } from "react";
import styled from "styled-components";
import { ReducerContext } from "../../reducer/context.js";

const Container = styled.div`
  top: 60px;
  width: 100%;
  height: calc(100% - 60px);
  position: absolute;
  display: grid;

  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 1fr 12fr 1fr;

  transition: opacity 0.2s;

  z-index: 1;

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
  const [state, dispatch] = useContext(ReducerContext);
  const { blackBox } = state;
  const boxes = Array(9)
    .fill(null)
    .map((_, index) => (
      <Box key={index} className={index === 4 ? "disable" : null} />
    ));
  return <Container className={blackBox ? null : "disable"}>{boxes}</Container>;
};

export default BorderBox;
