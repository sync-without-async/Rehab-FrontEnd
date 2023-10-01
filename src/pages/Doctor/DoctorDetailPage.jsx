import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from '../../components/Button/BackButton';
import DoctorDetailHeader from '../../components/DoctorDashBoard/DoctorDetailHeader';

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

const DoctorDetailPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <BackButton pageName="환자 목록" />
        <DoctorDetailHeader/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default DoctorDetailPage;
