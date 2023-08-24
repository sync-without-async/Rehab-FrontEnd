import { useState ,  useEffect } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";
import CourseCard from "../components/CourseCard";

import { getAllCourses } from "../librarys/exercise-api.js";

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
`;

const CategoryText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 400px;
  margin-top: 20px;
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPosture, setSelectedPosture] = useState(null);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const allCourses = await getAllCourses(); 
      setCourses(allCourses);
    }

    fetchCourses();
  }, []);
  
  const filteredCourses = courses.filter(course => {
    if (!selectedCategory && !selectedPosture) return true;
    if (selectedCategory && !selectedPosture) return course.tags.includes(selectedCategory);
    if (!selectedCategory && selectedPosture) return course.tags.includes(selectedPosture);
    return course.tags.includes(selectedCategory) && course.tags.includes(selectedPosture);
  });

  return (
    <div>
      <Header />
      <Background>
        <DumbbellImage src={dumbbell} alt="Dumbbell" />
        <ProgramText>프로그램</ProgramText>
      </Background>
      <CategoryText>
        <Label>카테고리별</Label>
        {["팔", "어깨", "목", "허벅지"].map((category) => (
          <FilterButton
            key={category}
            selected={selectedCategory === category}
            onClick={() => 
              setSelectedCategory(prev => prev === category ? null : category)
            }
          >
            {category}
          </FilterButton>
        ))}
      </CategoryText>
      <CategoryText>
        <Label>자세</Label>
        {["선 자세", "앉은 자세", "누운 자세"].map((posture) => (
          <FilterButton
            key={posture}
            selected={selectedPosture === posture}
            onClick={() => 
              setSelectedPosture(prev => prev === posture ? null : posture)
            }
          >
            {posture}
          </FilterButton>
        ))}
      </CategoryText>
      <CardContainer>
      {filteredCourses.map(course => (
        <CourseCard
          key={course.id} 
          image={course.image} 
          title={course.title}
          description={course.description}
          time={course.time}
          tags={course.tags}
        />
      ))}
    </CardContainer>
    </div>
  );
};

export default MainPage;

