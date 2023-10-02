import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from '../../components/Button/BackButton';
import TheraDetailHeader from '../../components/TherapistDashBoard/TheraDetailHeader';

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

const TheraDetailPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
      <BackButton pageName="환자 목록" />
      <TheraDetailHeader/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default TheraDetailPage;
