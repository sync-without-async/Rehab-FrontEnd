import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import TheraDetailHeader from "../../components/TherapistDashBoard/TheraDetailHeader";
import TheraDetailChart from "../../components/TherapistDashBoard/TheraDetailChart";
import TheraCheckHW from "../../components/TherapistDashBoard/TheraCheckHW";
import TheraUntactRecord from "../../components/TherapistDashBoard/TheraUntactRecord";
import TheraFaceRecord from "../../components/TherapistDashBoard/TheraFaceRecord";
import TherafromDoctor from "../../components/TherapistDashBoard/TherafromDoctor";
import PageContainer from "../../components/Common/PageContainer.jsx";

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  width: 42%;
  margin: 20px 0;
`;

const TheraDetailPage = () => {
  return (
    <PageContainer>
      <BackButton text="환자 목록으로 돌아가기" to="/chart" />
      <TheraDetailHeader />
      <RowContainer>
        <TheraDetailChart />
        <TheraCheckHW />
      </RowContainer>
      <TherafromDoctor />
      <TheraFaceRecord />
      <TheraUntactRecord />
    </PageContainer>
  );
};

export default TheraDetailPage;
