import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CourseCardContainer = styled.div`
  width: 240px;  
  height: 300px;
  border: 1px solid black;
  border-radius: 10px;  
  display: flex;
  flex-direction: column;
  background-color: white; 
  font-family: "SUIT Variable";
`;

const CourseImage = styled.img`
  height: 150px;
  width: 100%;
  border-radius: 10px 10px 0 0;
  object-fit: cover; 
`

const CourseInfo = styled.div`
  height: 150px;
  padding: 0 15px; 
  display: flex;
  flex-direction: column;
  font-family: "SUIT Variable";
  justify-content: space-between; 
`;

const CourseTitle = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: black;
  margin-top:20px;
  margin-bottom: 5px;  
  font-family: "SUIT Variable";
`;

const CourseDescription = styled.span`
  font-size: 10px;
  margin-bottom: 5px; 
  max-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: "SUIT Variable";
`;


const HorizontalLine = styled.div`
  width: calc(100% - 10px);  
  height: 1px;
  background-color: black;
  margin: 0 auto; 
`;

const TagContainer = styled.div`
  display: flex;             
  flex-wrap: wrap;           
  margin-top: -10px;  
  font-family: "SUIT Variable";   
  margin-bottom: 20px;     
`;

const TagButton = styled.button`
  width: 60px; 
  height: 20px;
  padding: 0 10px;
  border-radius: 10px;
  font-size: 10px;
  background-color: white;
  border: 1px solid black;
  margin-top: 10px;
  margin-right: 5px;  
  display: inline-block; 
  white-space: nowrap;
  font-family: "SUIT Variable";
`;

const LinkedCourseCardContainer = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const CourseCard = ({ id, image, title, description, tags }) => {  
  return (
    <LinkedCourseCardContainer to={`/program/${id}`}>
      <CourseCardContainer>
        <CourseImage src={image} alt={title}></CourseImage>
        <CourseInfo>
          <CourseTitle>{title}</CourseTitle>
          <CourseDescription>{description}</CourseDescription>
          <HorizontalLine />
          <TagContainer>
            {tags && tags.map((tag, index) => (
              <TagButton key={index}>{tag}</TagButton>
            ))}
          </TagContainer>
        </CourseInfo>
        </CourseCardContainer>
    </LinkedCourseCardContainer>
  );
};

CourseCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string) 
};

export default CourseCard;
