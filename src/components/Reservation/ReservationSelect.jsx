import { useState, useEffect } from "react";
import styled from "styled-components";
import { UserSelectCard } from "../UserDashBoard/UserSelectCard";
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

const ReservationSelect = () => {
  return (
    <BlockContainer>
      <ReservationCreateModal />
      <TitleText text="비대면 진료 예약" />
      <Text>진료를 희망하는 의료진을 선택해주세요.</Text>
      <CardWrapper>
        <UserSelectCard
          id="doctor1"
          role="전문의"
          name="사용자"
          hospital="춘천성심병원"
          department="재활의학과"
        />
        <UserSelectCard
          id="the1"
          role="재활치료사"
          name="사용자"
          hospital="춘천성심병원"
          department="재활의학과"
        />
      </CardWrapper>
    </BlockContainer>
  );
};

export default ReservationSelect;
