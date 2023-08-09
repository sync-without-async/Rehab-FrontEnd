import Header from "../components/Header";
import styled from 'styled-components';

const CourseBox = styled.div`
  width: 1100px;
  height: 216px;
  background-color: #D9D9D9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 120px;
  margin-top:30px;
`;

const CourseTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: -110px;
`;

const LearningStatus = styled.div`
  width: 1112px;
  display: flex;
  flex-direction: column;
  margin-left: 120px;
`;

const LearningTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom:5px;
`;

const LearningLine = styled.hr`
  width: 1100px;
  border: 2px solid black;
  margin-bottom:5px;
`;

const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ProgressText = styled.span`
  font-size: 18px;
  margin-right: 40px;
`;

const ProgressBar = styled.div`
  width: 800px;
  height: 40px;
  background-color: grey; 
`;

const ProgressCount = styled.span`
  font-size: 18px;
  margin-left: 30px;
`;

const CourseDetail = () => {
  return (
    <div>
      <Header />
      <CourseBox>
        <CourseTitle>[맨몸운동] 거북목 탈출코스</CourseTitle>
      </CourseBox>
      <LearningStatus>
        <LearningTitle>학습현황</LearningTitle>
        <LearningLine />
        <ProgressWrapper>
          <ProgressText>나의 진도율</ProgressText>
          <ProgressBar />
          <ProgressCount>0/ 총개수</ProgressCount>
        </ProgressWrapper>
      </LearningStatus>
    </div>
  );
};

export default CourseDetail;
