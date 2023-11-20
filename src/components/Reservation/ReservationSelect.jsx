import { useState, useEffect } from "react";
import styled from "styled-components";
import { UserSelectCard } from "../UserDashBoard/UserSelectCard";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import ReservationCreateModal from "./ReservationCreateModal.jsx";
import { useSelector } from "react-redux";
import { selectDoctor, selectTherapist } from "../../redux/userSlice.js";

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

const ReservationSelect = () => {
  const doctor = useSelector(selectDoctor) || {};
  const therapist = useSelector(selectTherapist) || {};
  return (
    <BlockContainer>
      <ReservationCreateModal />
      <TitleText text="비대면 진료 예약" />
      <Text>진료를 희망하는 의료진을 선택해주세요.</Text>
      <CardWrapper>
        <UserSelectCard
          id={doctor.id}
          role={doctor.role}
          name={doctor.name}
          hospital={doctor.hospital}
          department={doctor.department}
          image={doctor.image}
        />
        <UserSelectCard
          id={therapist.id}
          role={therapist.role}
          name={therapist.name}
          hospital={therapist.hospital}
          department={therapist.department}
          image={therapist.image}
        />
      </CardWrapper>
    </BlockContainer>
  );
};

export default ReservationSelect;
