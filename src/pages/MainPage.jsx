import { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";
import CourseCard from "../components/CourseCard";

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

  const courses = [
    { 
      title: "거북목 탈출코스",
      description: "이 코스는 목과 어깨의 근육을 이완시켜주는 운동을 포함하고 있습니다.",
      time: "총 10분",
      tags: ["목", "어깨", "앉은 자세"]
    },
    { 
      title: "코어 강화 코스",
      description: "코어 근육을 강화하는데 초점을 둔 운동을 학습합니다.",
      time: "총 15분",
      tags: ["팔", "선 자세"]
    },
    { 
      title: "하체 강화 코스",
      description: "다리와 엉덩이 근육을 강화하는 운동을 진행합니다.",
      time: "총 25분",
      tags: ["허벅지", "선 자세"]
    },
  
    { 
      title: "유연성 향상 코스",
      description: "몸의 유연성을 높이는 스트레칭 운동을 포함하고 있습니다.",
      time: "총 15분",
      tags: ["어깨", "앉은 자세"]
    },
  
    { 
      title: "유산소 운동 코스",
      description: "심장 건강과 체력 향상을 위한 유산소 운동을 합니다.",
      time: "총 30분",
      tags: ["어깨", "선 자세"]
    },
  
    { 
      title: "근력 운동 코스",
      description: "체중을 이용한 근력 운동을 중점적으로 합니다.",
      time: "총 15분",
      tags: ["허벅지", "선 자세", "앉은 자세"]
    },
  
    { 
      title: "밸런스 트레이닝",
      description: "몸의 균형 능력을 향상시키기 위한 운동 코스입니다.",
      time: "총 20분",
      tags: ["어깨", "앉은 자세"]
    },
  
    { 
      title: "포스쳐 교정 코스",
      description: "올바른 자세를 유지하기 위한 교정 운동을 포함하고 있습니다.",
      time: "총 15분",
      tags: ["목", "선 자세"]
    },
  ];
  
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
            onClick={() => setSelectedCategory(category)}
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
            onClick={() => setSelectedPosture(posture)}
          >
            {posture}
          </FilterButton>
        ))}
      </CategoryText>
      <CardContainer>
      {filteredCourses.map(course => (
        <CourseCard
          key={course.title}
          image={null}
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
