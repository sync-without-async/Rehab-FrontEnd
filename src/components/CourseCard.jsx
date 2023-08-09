import styled from 'styled-components';
import PropTypes from 'prop-types';

const CourseCardContainer = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
`;

const CourseImage = styled.div`
  height: 150px;
  background-color: grey; 
  border-radius: 20px 20px 0 0;
`;

const CourseInfo = styled.div`
  height: 150px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CourseTitle = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const CourseTime = styled.span`
  font-size: 14px;
`;

const CourseCard = ({ image, title, time }) => {
  return (
    <CourseCardContainer>
      <CourseImage style={{ backgroundImage: `url(${image})` }}></CourseImage>
      <CourseInfo>
        <CourseTitle>{title}</CourseTitle>
        <CourseTime>{time}</CourseTime>
      </CourseInfo>
    </CourseCardContainer>
  );
};

CourseCard.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};


export default CourseCard;
