import Header from "../components/Header";
import CategoryButton from "../components/CategoryButton";
import CourseCard from "../components/CourseCard"; 
import styled from 'styled-components';

const RecommendedTitle = styled.h1`
  font-size: 50px;
  font-weight: bold;
  margin-left: 200px;
`;

const CourseWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px auto; 
  max-width: 940px;
`;


const MainPage = () => {
  return (
    <div>
      <Header />
      <CategoryButton />
      <RecommendedTitle>추천 코스</RecommendedTitle>
      <CourseWrapper>
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
      </CourseWrapper>
    </div>
  );
};

export default MainPage;
