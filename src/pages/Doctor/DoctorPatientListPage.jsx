import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from '../../components/Button/BackButton';
import DoctorPatientList from '../../components/DoctorDashBoard/DoctorPatientList';

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

const DoctorPatientListPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <DoctorPatientList/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default DoctorPatientListPage;
