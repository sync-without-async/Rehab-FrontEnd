import styled from 'styled-components';
import Header from '../components/Header/Header';
import UserUntactRecord from '../components/UserDashBoard/UserUntactRecord';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column; 
  height: 100vh;
`;

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1; 
  margin-top: -50px;
`;

const DevelopPage = () => {

  return (
      <PageContainer>
          <Header/>
          <CenteredContainer>
            <UserUntactRecord />
          </CenteredContainer>
      </PageContainer>
  );
}

export default DevelopPage;