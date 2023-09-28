import styled from 'styled-components';
import Header from '../components/Header/Header';
import UserDashHeader from '../components/UserDashBoard/UserDashHeader';

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
            <UserDashHeader/>
          </CenteredContainer>
      </PageContainer>
  );
}

export default DevelopPage;