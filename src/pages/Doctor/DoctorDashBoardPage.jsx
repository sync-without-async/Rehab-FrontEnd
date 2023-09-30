import styled from 'styled-components';
import Header from '../../components/Header/Header';
import DoctorDashHeader from '../../components/DoctorDashBoard/DoctorDashHeader';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const DoctorDashBoardPage = () => {

  return (
    <PageContainer>
      <Header/>
      <DoctorDashHeader/>
    </PageContainer>
  );
}

export default DoctorDashBoardPage;
