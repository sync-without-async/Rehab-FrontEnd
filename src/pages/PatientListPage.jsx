import PageContainer from "../components/Common/PageContainer.jsx";
import BackButton from "../components/Button/BackButton.jsx";
import PatientList from "../components/Chart/PatientList.jsx";

const PatientListPage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/dashboard" />
      <PatientList />
    </PageContainer>
  );
};

export default PatientListPage;
