import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import ReservationSelect from "../../components/Reservation/ReservationSelect";
import PageContainer from "../../components/Common/PageContainer";

const ReservationCreatePage = () => {
  return (
    <PageContainer>
      <BackButton text="대시보드로 돌아가기" to="/" />
      <ReservationSelect />
    </PageContainer>
  );
};

export default ReservationCreatePage;
