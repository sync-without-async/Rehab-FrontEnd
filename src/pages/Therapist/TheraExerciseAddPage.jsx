import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraExerciseAdd from "../../components/TherapistDashBoard/TheraExerciseAdd";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 50px;
`;

const TheraExerciseAddPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <BackButton pageName="운동 목록" />
        <TheraExerciseAdd />
      </CenteredContainer>
    </PageContainer>
  );
};

export default TheraExerciseAddPage;
