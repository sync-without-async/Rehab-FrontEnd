import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import styled from "styled-components";
import { getCourse } from "../librarys/exercise-api.js";

import dumbbell from "../assets/images/dumbbell.png";
import CheckB from "../assets/images/Check-Before.png";
import CheckA from "../assets/images/Check-After.png";
import Player from "../assets/images/play.png";
import { useSelector } from "react-redux";
import { selectEmail } from "../redux/userSlice";

const Container = styled.div`
  width: 100%;
`;

const Background = styled.div`
  width: 100%;
  height: 250px;
  padding: 0 100px;
  background-color: #14f2c6;
  margin-top: 20px;
  display: flex;
  align-items: center;
`;

const ExerciseInfo = styled.div`
  margin-left: 24px;
  display: flex;
  flex-direction: column;
`;

const ExerciseImage = styled.img`
  width: 300px;
  height: 180px;
  object-fit: cover;
`;

const ExerciseTitle = styled.h1`
  font-weight: bold;
  font-family: "SUIT Variable";
  font-size: 25px;
`;

const ExerciseDescription = styled.p`
  font-family: "SUIT Variable";
  font-size: 20px;
  margin: 10px 0;
`;

const TagContainer = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
`;

const Tag = styled.div`
  padding: 4px 16px;
  background-color: white;
  border: 1px solid black;
  border-radius: 20px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  font-family: "SUIT Variable";

  &:nth-of-type(1) {
    left: 610px;
  }
`;

const Spacer = styled.div`
  flex-grow: 1;
`;

const DumbbellImage = styled.img`
  width: 80px;
  margin-bottom: 36px;
  object-fit: contain;
  align-self: flex-end;
`;

const Wrapper = styled.div`
  margin: 0 128px;
`;

const CurriculumTitle = styled.h2`
  margin: 20px 0;
  font-weight: 600;
  font-size: 18px;
  font-family: "SUIT Variable";
`;

const ActionTitleName = styled.span``;

const ActionTitleTime = styled.span``;

const DividerLine = styled.div`
  height: 1px;
  background-color: black;
`;

const CourseInfoContainer = styled.div`
  padding: 0 16px;
  display: grid;
  grid-template-columns: 64px 1fr 72px 72px;
  align-items: center;
  height: 60px;

  &.header {
    background-color: rgba(217, 217, 217, 0.38);
  }
`;

const CheckImage = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 10px;
`;

const ActionName = styled.span`
  font-family: "SUIT Variable";
`;
const ActionTime = styled.span`
  font-family: "SUIT Variable";
`;

const PlayerButton = styled.button`
  background: url(${Player}) no-repeat center center;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: 0.3s;
  margin-right: 15px;

  &:hover {
    opacity: 0.7;
  }
`;

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const { pno } = useParams();
  const userId = useSelector(selectEmail);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function fetchCourse() {
      try {
        const courseData = await getCourse(Number(pno), userId);
        setCourse(courseData);
        console.log(courseData);
      } catch (error) {
        console.error(
          "프로그램 상세 페이지를 불러오는데 실패했습니다. :",
          error,
        );
      }
    }

    fetchCourse();
  }, [userId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  function createCourse(key, title, time) {
    return (
      <CourseInfoContainer key={key}>
        <CheckImage src={CheckB} />
        <ActionName>{title}</ActionName>
        <ActionTime>{time}초</ActionTime>
        <PlayerButton onClick={() => navigate(`/program/${pno}/play`)} />
      </CourseInfoContainer>
    );
  }

  return (
    <Container>
      <Header />
      <Background>
        <ExerciseImage src={course.image} alt="Exercise" />
        <ExerciseInfo>
          <ExerciseTitle>{course.title}</ExerciseTitle>
          <ExerciseDescription>{course.description}</ExerciseDescription>
          <TagContainer>
            <Tag>{course.category}</Tag>
            <Tag>{course.posture}</Tag>
          </TagContainer>
        </ExerciseInfo>
        <Spacer />

        <DumbbellImage src={dumbbell} alt="Dumbbell" />
      </Background>
      <Wrapper>
        <CurriculumTitle>커리큘럼</CurriculumTitle>
        <CourseInfoContainer className="header">
          <span />
          <ActionName>운동 이름</ActionName>
          <ActionTime>시간</ActionTime>
          <span />
        </CourseInfoContainer>
        {course.actResponseDTO.map((item) =>
          createCourse(item.ord, item.actName, item.playTime),
        )}
        <DividerLine />
      </Wrapper>
    </Container>
  );
};

export default CourseDetail;
