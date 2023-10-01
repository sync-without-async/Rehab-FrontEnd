import styled from 'styled-components';
import Header from '../../components/Header/Header';
import BackButton from "../../components/Button/BackButton";
import DoctorUntactFullList from '../../components/DoctorDashBoard/DoctorUntactFullList';

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

const DoctorUntactReservePage = () => {
  return (
    <PageContainer>
      <Header/>
      <CenteredContainer>
        <BackButton pageName="대시보드" />
        <DoctorUntactFullList/>
      </CenteredContainer>
    </PageContainer>
  );
}

export default DoctorUntactReservePage;
