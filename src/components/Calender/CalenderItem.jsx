import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #F3F1FF;
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const CalenderItem = ({ date }) => {
  return (
    <Container>
      <Text>{date}</Text>
    </Container>
  );
};

CalenderItem.propTypes = {
  date: PropTypes.number.isRequired,
};

export default CalenderItem;
