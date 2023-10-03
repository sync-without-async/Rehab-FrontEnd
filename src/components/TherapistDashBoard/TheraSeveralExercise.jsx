import styled from 'styled-components';

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 720px;
  height: 120px;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 20px;
`;

const ExerciseThumbnail = styled.div`
  width: 120px;
  height: 88px;
  background-color: #DFDFDF;
  border: 1px solid #ABABAB;
  border-radius: 10px;
  margin-right: 15px;
`;

const ExerciseTitle = styled.div`
  font-size: 20px;
  color: #000000;
  font-weight: bold;
`;

const ExerciseDescription = styled.div`
  font-size: 13px;
  color: #000000;
  margin-top: 5px; // 제목과 설명 텍스트 사이의 간격을 위해
`;

const TheraSeveralExercise = () => {
  return (
    <>
      <CardContainer>
        <ExerciseThumbnail />
        <div>
          <ExerciseTitle>운동 제목</ExerciseTitle>
          <ExerciseDescription>운동 설명</ExerciseDescription>
        </div>
      </CardContainer>
    </>
  );
};

export default TheraSeveralExercise;
