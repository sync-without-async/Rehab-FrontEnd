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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 10px; 
`;

const StyledComponentWrapper = styled.div`
  margin: 14px 0;

  &:first-child {
    margin-top: 60px;
  }

  &:not(:last-child) {
    margin-bottom: 28px; 
  }
`;


const MyUserPage = () => {

  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <StyledComponentWrapper>
          <UserDashHeader/>
        </StyledComponentWrapper>
        <StyledComponentWrapper>
          <UserAssignList/>
        </StyledComponentWrapper>
        <StyledComponentWrapper>
          <UserUntactRecord />
        </StyledComponentWrapper>
      </CenteredContainer>
    </PageContainer>
  );
}

export default MyUserPage;
