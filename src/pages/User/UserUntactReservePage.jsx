import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from "../../components/Button/BackButton";

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

const UserUntactReservePage = () => {

  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
      <BackButton pageName="나의 수강" />
      </CenteredContainer>
    </PageContainer>
  );
}

export default UserUntactReservePage;