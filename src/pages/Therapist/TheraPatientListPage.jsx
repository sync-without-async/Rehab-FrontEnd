import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from '../../components/Button/BackButton';
import TheraPatientList from '../../components/TherapistDashBoard/TheraPatientList';

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

const TheraPatientListPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <TheraPatientList/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default TheraPatientListPage;
