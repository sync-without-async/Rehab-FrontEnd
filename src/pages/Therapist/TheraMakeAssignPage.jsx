import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraMakeAssign from "../../components/TherapistDashBoard/TheraMakeAssgin";

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

const TheraMakeAssignPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <TheraMakeAssign />
      </CenteredContainer>
    </PageContainer>
  );
};

export default TheraMakeAssignPage;
