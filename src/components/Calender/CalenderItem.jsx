
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 50px;
  height: 40px;
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${({ isSelected }) => (isSelected ? "#f3f1ff" : "transparent")};

  &:hover {
    background-color: #f3f1ff;
  }
  &.prevMonth,
  &.nextMonth {
    color: rgba(21, 21, 21, 0.3);
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 300; 
`;

const CalenderItem = ({ date, type, isSelected, onSelectDate }) => {
  const handleDateClick = () => {
    onSelectDate(date);
  };

  return (
    <Container isSelected={isSelected} onClick={handleDateClick}>
      <Text className={type}>{date}</Text>
    </Container>
  );
};

CalenderItem.propTypes = {
  date: PropTypes.number,
  type: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelectDate: PropTypes.func.isRequired,
};

export default CalenderItem;

