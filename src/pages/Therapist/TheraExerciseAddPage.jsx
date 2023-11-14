import BackButton from "../../components/Button/BackButton";
import TheraExerciseAdd from "../../components/TherapistDashBoard/TheraExerciseAdd";
import PageContainer from "../../components/Common/PageContainer";

const TheraExerciseAddPage = () => {
  return (
    <PageContainer>
      <BackButton text="운동 목록으로 돌아가기" to="/video" />
      <TheraExerciseAdd />
    </PageContainer>
  );
};

export default TheraExerciseAddPage;
