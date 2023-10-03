import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from '../../components/Button/BackButton';
import TheraExerciseList from '../../components/TherapistDashBoard/TheraExerciseList';

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

const TheraExerciseListPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
      <BackButton pageName="대시보드" />
      <TheraExerciseList/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default TheraExerciseListPage;
