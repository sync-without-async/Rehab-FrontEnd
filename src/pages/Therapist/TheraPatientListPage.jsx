import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraPatientList from "../../components/TherapistDashBoard/TheraPatientList";
import PageContainer from "../../components/Common/PageContainer.jsx";

const TheraPatientListPage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/dashboard" />
      <TheraPatientList />
    </PageContainer>
  );
};

export default TheraPatientListPage;
