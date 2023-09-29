import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from "../../components/Button/BackButton";
import UserDoReserve from '../../components/UserDashBoard/UserDoReserve';


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
`;


const UserReservePage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <BackButton pageName="나의 수강" />
        <UserDoReserve/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default UserReservePage;