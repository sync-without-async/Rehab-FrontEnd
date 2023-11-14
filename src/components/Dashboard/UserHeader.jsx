import { useState, useEffect } from "react";
import styled from "styled-components";
import TheraImage from "../../assets/images/user/Otherapist.png";
import { userLogin } from "../../librarys/dummy-api";
import IconDoctor from "../../assets/icons/icondoctor.png";
import IconHospital from "../../assets/icons/iconhospital.png";
import { useSelector } from "react-redux";
import { selectName } from "../../redux/userSlice.js";

const Container = styled.div`
  width: 800px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #0064ff;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Row = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

const ItemRow = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: flex-end;
  gap: 36px;
`;

const UserName = styled.span`
  font-size: 25px;
  color: #0064ff;
  font-weight: 700;
  line-height: 25px;
`;

const Text = styled.span`
  font-size: 16px;
  color: #000000;
  font-weight: 400;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 120px;
  background-color: #efefef;
`;

const ItemContainer = styled.div`
  display: flex;
  gap: 12px;
`;
const ItemHeader = styled.p`
  font-size: 14px;
  font-weight: 600;
`;
const ItemText = styled.p`
  font-size: 14px;
  font-weight: 400;
`;

const UserHeader = () => {
  const name = useSelector(selectName);

  return (
    <Container>
      <TextContainer>
        <Row>
          <UserName>{name}</UserName>
          <Text>님, 안녕하세요.</Text>
        </Row>
        <Row>
          <Text>{name}님께 할당된 재활 운동들을 확인해보세요! </Text>
        </Row>
        <ItemRow>
          <ItemContainer>
            <ItemHeader>최근 외래 진료일</ItemHeader>
            <ItemText>2023.09.01</ItemText>
          </ItemContainer>
          <ItemContainer>
            <ItemHeader>다음 외래 예약일</ItemHeader>
            <ItemText>2023.09.12</ItemText>
          </ItemContainer>
        </ItemRow>
      </TextContainer>
      <Avatar src={TheraImage} alt="User Avatar" />
    </Container>
  );
};
export default UserHeader;
