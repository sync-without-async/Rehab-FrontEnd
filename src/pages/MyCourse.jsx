import { useState, useEffect } from "react";
import { getAllCourses } from "../librarys/exercise-api.js";

import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";

import CourseCard from "../components/CourseCard";
import { useSelector } from "react-redux";
import { selectEmail, selectName, selectToken } from "../redux/userSlice.js";
import { getMyPrograms } from "../librarys/my-program-api.js";

const PageWrapper = styled.div`
  background-color: #aceaff;
  min-height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  font-family: "SUIT Variable";
`;

const Greeting = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-top: 100px;
  margin-left: 100px;
  font-family: "SUIT Variable";
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
  font-family: "SUIT Variable";
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px auto;
  max-width: 1200px;
  font-family: "SUIT Variable";
`;

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const userName = useSelector(selectName);
  const userId = useSelector(selectEmail);

  useEffect(() => {
    if (userId) {
      getMyPrograms(userId).then((response) => {
        setCourses(response);
      });
    }
  }, [userId]);

  return (
    <PageWrapper>
      <Header />
      <Greeting>
        안녕하세요,
        <br />
        {userName}님.
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
