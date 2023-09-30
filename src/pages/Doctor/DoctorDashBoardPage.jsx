import styled from 'styled-components';
import Header from '../../components/Header/Header';
import DoctorDashHeader from '../../components/DoctorDashBoard/DoctorDashHeader';
import CardhButton from '../../components/DoctorDashBoard/CardButton';

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
  margin-top: 10px; 
`;

const DoctorDashBoardPage = () => {

  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
      <DoctorDashHeader/>
      <CardhButton mode="list" />
      <CardhButton mode="treatment" />
      <CardhButton mode="register" />
      </CenteredContainer>
    </PageContainer>
  );
}

export default DoctorDashBoardPage;
