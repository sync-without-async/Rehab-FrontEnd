import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraExerciseList from "../../components/TherapistDashBoard/TheraExerciseList";
import PageContainer from "../../components/Common/PageContainer";

const TheraExerciseListPage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/" />
      <TheraExerciseList />
    </PageContainer>
  );
};

export default TheraExerciseListPage;
