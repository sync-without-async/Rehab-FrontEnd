import BackButton from "../../components/Button/BackButton";
import TheraExerciseAdd from "../../components/TherapistDashBoard/TheraExerciseAdd";
import PageContainer from "../../components/Common/PageContainer";

const TheraExerciseAddPage = () => {
  return (
    <PageContainer>
      <BackButton pageName="운동 목록" />
      <TheraExerciseAdd />
    </PageContainer>
  );
};

export default TheraExerciseAddPage;
