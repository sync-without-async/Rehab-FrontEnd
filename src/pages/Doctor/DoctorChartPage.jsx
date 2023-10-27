import styled from "styled-components";
import DoctorChart from "../../components/DoctorDashBoard/DoctorChart";
import BackButton from "../../components/Button/BackButton";

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

const DoctorChartPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <DoctorChart />
      </CenteredContainer>
    </PageContainer>
  );
};

export default DoctorChartPage;
