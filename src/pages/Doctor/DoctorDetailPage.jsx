import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import DoctorDetailHeader from "../../components/DoctorDashBoard/DoctorDetailHeader";
import DoctorDetailChart from "../../components/DoctorDashBoard/DoctorDetailChart";
import DoctorCheckHW from "../../components/DoctorDashBoard/DoctorCheckHW";
import DoctorUntactRecord from "../../components/DoctorDashBoard/DoctorUntactRecord";
import DoctorFaceRecord from "../../components/DoctorDashBoard/DoctorFaceRecord";
import PageContainer from "../../components/Common/PageContainer.jsx";

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 42%;
  margin: 20px 0;
`;

const DoctorDetailPage = () => {
  return (
    <PageContainer>
      <BackButton text="환자 목록으로 돌아가기" to="/chart" />
      <DoctorDetailHeader />
      <RowContainer>
        <DoctorDetailChart />
        <DoctorCheckHW />
      </RowContainer>
      <DoctorFaceRecord />
      <DoctorUntactRecord />
    </PageContainer>
  );
};

export default DoctorDetailPage;
