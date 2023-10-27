import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraUntactFullList from "../../components/TherapistDashBoard/TheraUntactFullList";

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

const TheraUntactReservetPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <TheraUntactFullList />
      </CenteredContainer>
    </PageContainer>
  );
};

export default TheraUntactReservetPage;
