import { useState, useEffect } from 'react';
import Header from "../components/Header";
import styled from 'styled-components';
import dumbbell from "../assets/images/dumbbell.png";
import { getCourse } from "../librarys/exercise-api.js";
import { useParams } from 'react-router-dom';


const Background = styled.div`
  width: 100%;
  height: 250px;
  background-color: #14f2c6;
  position: relative;
  margin-top: 20px;
`;

const ExerciseImage = styled.img`
  position: absolute;
  left: 150px;
  top: 40px;
  width: 300px;
  height: 180px;
  object-fit: cover;
`;

const ExerciseTitle = styled.h1`
  position: absolute;
  left: 500px;
  top: 40px;
  font-weight: bold;
`;

const ExerciseDescription = styled.p`
  position: absolute;
  left: 500px;
  top: 70px;
`;

const Tag = styled.div`
  position: absolute;
  left: 500px;
  top: 120px;
  width: 100px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const DumbbellImage = styled.img`
  position: absolute;
  right: 100px;
  bottom: 10px;
`;

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    async function fetchCourse() {
      const courseData = await getCourse(Number(id)); 
      setCourse(courseData);
    }

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Background>
        <ExerciseImage src={course.image} alt={course.title} />
        <ExerciseTitle>{course.title}</ExerciseTitle>
        <ExerciseDescription>{course.description}</ExerciseDescription>
        {course.tags.map((tag, index) => (
          <Tag key={index} style={{ left: `${500 + (110 * index)}px` }}>{tag}</Tag>
        ))}
        <DumbbellImage src={dumbbell} alt="Dumbbell" />
      </Background>
    </div>
  );
};

export default CourseDetail;
