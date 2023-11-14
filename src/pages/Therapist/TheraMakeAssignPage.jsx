import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraMakeAssign from "../../components/TherapistDashBoard/TheraMakeAssign.jsx";
import PageContainer from "../../components/Common/PageContainer";

const TheraMakeAssignPage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/dashboard" />
      <TheraMakeAssign />
    </PageContainer>
  );
};

export default TheraMakeAssignPage;
