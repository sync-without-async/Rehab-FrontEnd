import styled from "styled-components";
import PropTypes from "prop-types";
import { useContext } from "react";
import { ReducerContext } from "../../reducer/context.js";
import classNames from "classnames";

const Container = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: background-color 0.2s;

  &:hover {
    background-color: #f8f8f8;
  }

  &.selected {
    background-color: #e7e3ff;

    & > p {
      font-weight: 600;
    }
  }

  &.empty {
    pointer-events: none;
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 300;
  user-select: none;
`;

const CalenderItem = ({ date }) => {
  const [state, dispatch] = useContext(ReducerContext);
  const { date: currentDate } = state;
  const isSelected = currentDate === date;
  const isEmpty = date === null;
  const className = classNames({ selected: isSelected, empty: isEmpty });

  function onClick() {
    if (isEmpty) return;
    dispatch({
      type: "date",
      payload: date,
    });
  }

  return (
    <Container className={className} onClick={onClick}>
      <Text>{date}</Text>
    </Container>
  );
};

CalenderItem.propTypes = {
  date: PropTypes.number,
};

export default CalenderItem;
