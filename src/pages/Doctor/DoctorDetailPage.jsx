import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import DoctorDetailHeader from "../../components/DoctorDashBoard/DoctorDetailHeader";
import DoctorDetailChart from "../../components/DoctorDashBoard/DoctorDetailChart";
import DoctorCheckHW from "../../components/DoctorDashBoard/DoctorCheckHW";
import DoctorUntactRecord from "../../components/DoctorDashBoard/DoctorUntactRecord";
import DoctorFaceRecord from "../../components/DoctorDashBoard/DoctorFaceRecord";
import PageContainer from "../../components/Common/PageContainer.jsx";

const Grid = styled.div`
  margin: 20px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const DoctorDetailPage = () => {
  return (
    <PageContainer>
      <BackButton text="환자 목록으로 돌아가기" to="/chart" />
      <DoctorDetailHeader />
      <Grid>
        <DoctorDetailChart />
        <DoctorCheckHW />
      </Grid>
      <DoctorFaceRecord />
      <DoctorUntactRecord />
    </PageContainer>
  );
};

export default DoctorDetailPage;
