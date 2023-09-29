import { useState } from "react";
import styled from "styled-components";
import dayjs from 'dayjs';
import CalenderItem from "../Calender/CalenderItem.jsx";
import IconLeft from "../../assets/icons/Page-left.png";
import IconRight from "../../assets/icons/Page-right.png";

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const Icon = styled.img`
  cursor: pointer;
  margin: 0 10px;
`;

const MonthLabel = styled.span`
  font-size: 1.2rem;
`;

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
  const [selectedMonth, setSelectedMonth] = useState(8);
  const [selectedDate, setSelectedDate] = useState(null);

  const prevMonth = () => {
    if (selectedMonth > 8) setSelectedMonth(prev => prev - 1);
  };

  const nextMonth = () => {
    if (selectedMonth < 11) setSelectedMonth(prev => prev + 1);
  };

  const daysInCurrentMonth = dayjs([2023, selectedMonth]).daysInMonth();
  const startDayOfWeek = dayjs([2023, selectedMonth, 1]).day();

  let days = [];
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push(i);
  }

  const paddingDays = startDayOfWeek;
  for (let i = 0; i < paddingDays; i++) {
    days.unshift(null);
  }

  while (days.length < 42) {
    days.push(null);
  }

  return (
    <>
      <SelectorContainer>
        <Icon src={IconLeft} alt="Previous Month" onClick={prevMonth} />
        <MonthLabel>{`2023.${selectedMonth < 9 ? `${selectedMonth }` : selectedMonth }`}</MonthLabel>
        <Icon src={IconRight} alt="Next Month" onClick={nextMonth} />
      </SelectorContainer>
      <Container>
        {days.map((day, idx) => {
          let type = day ? "currentMonth" : "paddingDay";
          return (
            <CalenderItem
              key={idx}
              date={day}
              type={type}
              isSelected={selectedDate === day && day !== null}
              onSelectDate={setSelectedDate}
            />
          );
        })}
      </Container>
    </>
  );
};

export default Calender;
