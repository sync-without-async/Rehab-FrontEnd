import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import DoctorDetailHeader from "../../components/DoctorDashBoard/DoctorDetailHeader";
import DoctorDetailChart from "../../components/DoctorDashBoard/DoctorDetailChart";
import DoctorCheckHW from "../../components/DoctorDashBoard/DoctorCheckHW";
import DoctorUntactRecord from "../../components/DoctorDashBoard/DoctorUntactRecord";
import DoctorFaceRecord from "../../components/DoctorDashBoard/DoctorFaceRecord";

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

const DoctorDetailPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <BackButton pageName="환자 목록" />
        <DoctorDetailHeader />
        <RowContainer>
          <DoctorDetailChart />
          <DoctorCheckHW />
        </RowContainer>
        <DoctorFaceRecord />
        <DoctorUntactRecord />
      </CenteredContainer>
    </PageContainer>
  );
};

export default DoctorDetailPage;
