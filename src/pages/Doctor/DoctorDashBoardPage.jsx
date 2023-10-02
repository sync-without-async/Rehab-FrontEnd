import styled from 'styled-components';
import Header from '../../components/Header/Header';
import DoctorDashHeader from '../../components/DoctorDashBoard/DoctorDashHeader';
import CardhButton from '../../components/Button/CardButton';
import DoctorUntactList from '../../components/DoctorDashBoard/DoctorUntactList';

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
  margin-bottom :20px;
`;

const DoctorDashBoardPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <DoctorDashHeader/>
        <CardButtonGroup>
          <CardhButton mode="list" />
          <CardhButton mode="treatment" />
          <CardhButton mode="register" />
        </CardButtonGroup>
        <DoctorUntactList/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default DoctorDashBoardPage;
