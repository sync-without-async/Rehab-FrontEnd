import styled from 'styled-components';
import Header from '../../components/Header/Header';

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

const DoctorChartPage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
      </CenteredContainer>
    </PageContainer>
  );
}

export default DoctorChartPage;
