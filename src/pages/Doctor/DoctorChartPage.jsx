import DoctorChart from "../../components/DoctorDashBoard/DoctorChart";
import BackButton from "../../components/Button/BackButton";
import PageContainer from "../../components/Common/PageContainer.jsx";

const DoctorChartPage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/" />
      <DoctorChart />
    </PageContainer>
  );
};

export default DoctorChartPage;
