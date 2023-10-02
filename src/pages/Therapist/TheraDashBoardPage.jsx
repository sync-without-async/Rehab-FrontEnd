import styled from 'styled-components';
import Header from '../../components/Header/Header';
import TheraDashHeader from '../../components/TherapistDashBoard/TheraDashHeader'
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

const TheraDashBoardPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <TheraDashHeader/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default TheraDashBoardPage;
