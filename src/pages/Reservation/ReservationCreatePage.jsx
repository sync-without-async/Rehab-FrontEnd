import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import UserDoReserve from "../../components/Reservation/UserDoReserve";
import PageContainer from "../../components/Common/PageContainer";

const ReservationCreatePage = () => {
  return (
    <PageContainer>
      <BackButton text="나의 수강으로 돌아가기" />
      <UserDoReserve />
    </PageContainer>
  );
};

export default ReservationCreatePage;
