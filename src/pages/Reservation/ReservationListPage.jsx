import BackButton from "../../components/Button/BackButton";
import PageContainer from "../../components/Common/PageContainer";
import ReservationList from "../../components/Reservation/ReservationList.jsx";

const ReservationListPage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/" />
      <ReservationList />
    </PageContainer>
  );
};

export default ReservationListPage;
