import styled from 'styled-components';
import Header from '../../components/Header/Header';
import UserDashHeader from '../../components/UserDashBoard/UserDashHeader';
import UserAssignList from '../../components/UserDashBoard/UserAssignList';
import UserUntactRecord from '../../components/UserDashBoard/UserUntactRecord';

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

const MyUserPage = () => {

  return (
      <PageContainer>
          <Header/>
          <CenteredContainer>
            <UserDashHeader/>
            <UserAssignList/>
            <UserUntactRecord />
          </CenteredContainer>
      </PageContainer>
  );
}

export default MyUserPage;