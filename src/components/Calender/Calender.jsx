import styled from "styled-components";
import dayjs from "dayjs";
import arraySupport from "dayjs/plugin/arraySupport";
import CalenderItem from "./CalenderItem.jsx";

dayjs.extend(arraySupport);

const Container = styled.div`
  width: 100%;
  margin-top: 23px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 6px;
`;

const Calender = () => {
  const current = dayjs();
  const year = current.year();
  const month = current.month();

  const daysInMonth = dayjs([year, month + 1, 0]).date();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <Container>
      {days.map((day) => (
        <CalenderItem key={day} date={day} />
      ))}
    </Container>
  );
};

export default Calender;
