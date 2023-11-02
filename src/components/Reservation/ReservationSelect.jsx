import { useState, useEffect } from "react";
import styled from "styled-components";
import { UserSelectCard } from "../UserDashBoard/UserSelectCard";
import { getDoctorData, userLogin } from "../../librarys/dummy-api";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import ReservationCreateModal from "./ReservationCreateModal.jsx";

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 30px;
`;

const Text = styled.p`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
`;

const { doctor, therapist } = getDoctorData();

const ReservationSelect = () => {
  return (
    <BlockContainer>
      <ReservationCreateModal />
      <TitleText text="비대면 진료 예약" />
      <Text>진료를 희망하는 의료진을 선택해주세요.</Text>
      <CardWrapper>
        <UserSelectCard userType="admin1" userData={doctor} />
        <UserSelectCard userType="admin2" userData={therapist} />
      </CardWrapper>
    </BlockContainer>
  );
};

export default ReservationSelect;
