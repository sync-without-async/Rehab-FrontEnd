import { useState, useEffect } from 'react';
import { getAllCourses } from "../librarys/exercise-api.js";

import Header from "../components/Header";
import styled from 'styled-components';
import dumbbell from "../assets/images/dumbbell.png";

import CourseCard from "../components/CourseCard";

const PageWrapper = styled.div`
  background-color: #ACEAFF;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Greeting = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 100px;
`;

const DumbbellImage = styled.img`
  margin-left: 100px;
  margin-top: 70px;
`;

const ExerciseTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-left: 100px;
  margin-top: 20px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px auto;
  max-width: 1200px;
`;

const MyCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedCourses = await getAllCourses();
      setCourses(fetchedCourses);
    }
    fetchData();
  }, []);

  return (
    <PageWrapper>
      <Header />
      <Greeting>
        안녕하세요,
        <br />
        오소현님.
      </Greeting>
      <DumbbellImage src={dumbbell} alt="dumbbell image" />
      <ExerciseTitle>진행한 운동</ExerciseTitle>
      <CardContainer>
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            image={course.image}
            title={course.title}
            description={course.description}
            time={course.time}
            tags={course.tags}
          />
        ))}
      </CardContainer>
    </PageWrapper>
  );
};

export default MyCourse;