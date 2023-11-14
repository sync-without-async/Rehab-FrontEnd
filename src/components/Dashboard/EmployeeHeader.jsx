import { useState, useEffect } from "react";
import styled from "styled-components";
import TheraImage from "../../assets/images/user/Otherapist.png";
import { userLogin } from "../../librarys/dummy-api";
import IconDoctor from "../../assets/icons/icondoctor.png";
import IconHospital from "../../assets/icons/iconhospital.png";
import { useSelector } from "react-redux";
import {
  selectDepartment,
  selectLocation,
  selectName,
} from "../../redux/userSlice.js";

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
  gap: 5px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 5px;
`;

const UserName = styled.span`
  font-size: 25px;
  color: #0064ff;
  font-weight: 700;
  line-height: 25px;
`;

const GreetingText = styled.span`
  font-size: 16px;
  color: #000000;
  font-weight: 500;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 120px;
  background-color: #efefef;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
`;

const InfoText = styled.span`
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
`;

const AppointmentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const EmployeeHeader = () => {
  const name = useSelector(selectName);
  const dept = useSelector(selectDepartment);
  const location = useSelector(selectLocation);

  return (
    <Container>
      <TextContainer>
        <Greeting>
          <UserName>{name}</UserName>
          <GreetingText>님, 안녕하세요.</GreetingText>
        </Greeting>
        <AppointmentInfo>
          <Icon src={IconDoctor} alt="Doctor" />
          <InfoText>{dept}</InfoText>
        </AppointmentInfo>
        <AppointmentInfo>
          <Icon src={IconHospital} alt="Hospital" />
          <InfoText>{location}</InfoText>
        </AppointmentInfo>
      </TextContainer>
      <Avatar src={TheraImage} alt="User Avatar" />
    </Container>
  );
};
export default EmployeeHeader;
