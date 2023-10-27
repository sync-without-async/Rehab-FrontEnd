import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraPatientList from "../../components/TherapistDashBoard/TheraPatientList";

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

const TheraPatientListPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <TheraPatientList />
      </CenteredContainer>
    </PageContainer>
  );
};

export default TheraPatientListPage;
