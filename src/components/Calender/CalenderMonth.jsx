import { useContext, useState } from "react";
import styled from "styled-components";
import { ReducerContext } from "../../reducer/context.js";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 24px;
    height: 24px;
    margin: 0 8px;
    padding: 4px;
    box-sizing: content-box;
    border-radius: 12px;
    color: #667080;
    cursor: pointer;
    vertical-align: middle;

    &:hover {
      background-color: #dfdfdf;
    }
  }
`;

const Text = styled.span`
  width: 100px;
  text-align: center;
  font-size: 24px;
  font-weight: 500;
  line-height: 24px;
  user-select: none;
`;

const CalenderMonth = () => {
  const [state, dispatch] = useContext(ReducerContext);
  const { year, month } = state;

  const prevMonth = () => {
    dispatch({
      type: "prevMonth",
    });
  };

  const nextMonth = () => {
    dispatch({
      type: "nextMonth",
    });
  };

  const title = `${year}. ${(month + 1).toString().padStart(2, "0")}`;

  return (
    <SelectorContainer>
      <MdOutlineArrowBackIos onClick={prevMonth} />
      <Text>{title}</Text>
      <MdOutlineArrowForwardIos onClick={nextMonth} />
    </SelectorContainer>
  );
};

export default CalenderMonth;
