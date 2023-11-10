import styled from "styled-components";
import TheraDashHeader from "../../components/TherapistDashBoard/TheraDashHeader";
import CardhButton from "../../components/Button/CardButton";
import ReservationMiniList from "../../components/Reservation/ReservationMiniList.jsx";

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

const CardButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const TheraDashBoardPage = () => {
  return (
    <PageContainer>
      <CenteredContainer>
        <TheraDashHeader />
        <CardButtonGroup>
          <CardhButton mode="exercise" />
          <CardhButton mode="treatment" />
          <CardhButton mode="add" />
        </CardButtonGroup>
        <ReservationMiniList />
      </CenteredContainer>
    </PageContainer>
  );
};

export default TheraDashBoardPage;
