import styled from "styled-components";
import Header from "../../components/Header/Header";
import BackButton from "../../components/Button/BackButton";
import TheraDetailHeader from "../../components/TherapistDashBoard/TheraDetailHeader";
import TheraDetailChart from "../../components/TherapistDashBoard/TheraDetailChart";
import TheraCheckHW from "../../components/TherapistDashBoard/TheraCheckHw";
import TheraUntactRecord from "../../components/TherapistDashBoard/TheraUntactRecord";
import TheraFaceRecord from "../../components/TherapistDashBoard/TheraFaceRecord";
import TherafromDoctor from "../../components/TherapistDashBoard/TherafromDoctor";

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

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 42%;
  margin: 20px 0;
`;

const TheraDetailPage = () => {
  return (
    <PageContainer>
      <Header />
      <CenteredContainer>
        <BackButton pageName="환자 목록" />
        <TheraDetailHeader />
        <RowContainer>
          <TheraDetailChart />
          <TheraCheckHW />
        </RowContainer>
        <TherafromDoctor />
        <TheraFaceRecord />
        <TheraUntactRecord />
      </CenteredContainer>
    </PageContainer>
  );
};

export default TheraDetailPage;
