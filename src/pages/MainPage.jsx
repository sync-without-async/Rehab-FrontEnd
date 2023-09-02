import { useState, useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";
import CourseCard from "../components/CourseCard";

import { CATEGORY, POSITION } from "../librarys/type.js";

import {
  getPrograms,
  searchProgramsWithCategory,
} from "../librarys/exercise-api.js";

const Background = styled.div`
  width: 100%;
  height: 250px;
  background-color: #14f2c6;
  position: relative;
  margin-top: 20px;
`;

const Label = styled.span`
  display: inline-block;
  width: 110px;
`;

const DumbbellImage = styled.img`
  position: absolute;
  bottom: 80px;
  left: 118px;
`;

const ProgramText = styled.p`
  position: absolute;
  font-size: 50px;
  bottom: 20px;
  left: 118px;
  font-family: "SUIT Variable";
  font-weight: bold;
`;

const CategoryText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 400px;
  margin-top: 20px;
  font-family: "SUIT Variable";
`;

const FilterButton = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 10px;
  border: ${(props) => (props.selected ? "none" : "1px solid black")};
  background-color: ${(props) => (props.selected ? "#ACEAFF" : "white")};
  color: ${(props) => (props.selected ? "black" : "black")};
  margin-left: 10px;
  transition: 0.3s;

  &:first-child {
    margin-left: 0;
  }

  &:focus {
    outline: none;
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px auto;
  max-width: 1200px;
`;

const MainPage = () => {
  const [category, setCategory] = useState(null);
  const [posture, setPosture] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getPrograms().then((response) => {
      setCourses(response.dtoList);
    });
  }, []);

  useEffect(() => {
    if (!category && !posture) {
      getPrograms().then((response) => {
        setCourses(response.dtoList);
      });
    } else {
      searchProgramsWithCategory(category, posture).then((response) => {
        setCourses(response.dtoList);
      });
    }
  }, [category, posture]);

  // 혹시 모르니 남겨둠...
  // const filteredPrograms = courses.filter((course) => {
  //   const isCategory = category === null || course.category === category;
  //   const isPosture = posture === null || course.posture === posture;
  //   return isCategory && isPosture;
  // });

  return (
    <div>
      <Header />
      <Background>
        <DumbbellImage src={dumbbell} alt="Dumbbell" />
        <ProgramText>프로그램</ProgramText>
      </Background>
      <CategoryText>
        <Label>카테고리별</Label>
        {CATEGORY.map(({ key, value }) => (
          <FilterButton
            key={key}
            selected={category === key}
            onClick={() => setCategory((prev) => (prev === key ? null : key))}
          >
            {value}
          </FilterButton>
        ))}
      </CategoryText>
      <CategoryText>
        <Label>자세</Label>
        {POSITION.map(({ key, value }) => (
          <FilterButton
            key={key}
            selected={posture === key}
            onClick={() => setPosture((prev) => (prev === key ? null : key))}
          >
            {value} 자세
          </FilterButton>
        ))}
      </CategoryText>
      <CardContainer>
        {courses.map((program) => (
          <CourseCard
            key={program.id}
            id={program.id}
            image={program.image}
            title={program.title}
            description={program.description}
            tags={program.tags}
          />
        ))}
      </CardContainer>
    </div>
  );
};

export default MainPage;