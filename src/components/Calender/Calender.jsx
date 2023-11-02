import { useContext, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import CalenderItem from "../Calender/CalenderItem.jsx";
import { ReducerContext } from "../../reducer/context.js";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 50px);
  grid-gap: 6px;
  grid-template-rows: repeat(6, 40px);
  justify-content: center;
  align-items: center;
`;

const Calender = () => {
  const [state, dispatch] = useContext(ReducerContext);
  const { year, month, date } = state;

  const daysInCurrentMonth = dayjs([2023, month]).daysInMonth();
  const startDayOfWeek = dayjs([2023, month, 1]).day();

  let days = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push(i);
  }

  const paddingDays = startDayOfWeek;
  for (let i = 0; i < paddingDays; i++) {
    days.unshift(null);
  }

  while (days.length < 35) {
    days.push(null);
  }

  return (
    <Container>
      {days.map((day, idx) => (
        <CalenderItem key={idx} date={day} />
      ))}
    </Container>
  );
};

export default Calender;
