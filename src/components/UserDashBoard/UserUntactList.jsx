import { useState } from "react";
import styled from "styled-components";
import DoctorImage from "../../assets/images/user/Odoctor.png";
import IconDoctor from "../../assets/icons/icondoctor.png";
import IconHospital from "../../assets/icons/iconhospital.png";
import IconDate from "../../assets/icons/icondate.png";

const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 700px;
  height: 110px;
  background-color: #ffffff;
  position: relative;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: 24px;
  top: 15px;
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 122px;
`;

const UserName = styled.div`
  font-size: 25px;
  font-weight: bold;
  display: flex;
  align-items: baseline;

  span {
    font-size: 15px;
    margin-left: 5px;
    font-weight: 300;
  }
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
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

const DateContain = styled.div`
  margin-left: 20px;
`;

const Button = styled.button`
  width: 160px;
  height: 32px;
  background-color: ${(props) =>
    props.cancelButton ? "#F3F3F3" : props.clicked ? "#888888" : "#3592FF"};
  color: ${(props) =>
    props.cancelButton ? "#000000" : props.clicked ? "#444444" : "#FEFDFD"};
  border: ${(props) => (props.cancelButton ? "1px solid #BBBBBB" : "none")};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  margin-left: 500px;
  top: ${(props) => (props.topPosition ? props.topPosition : "19px")};

  &:nth-child(2) {
    background-color: #f3f3f3;
    color: #000000;
    border: 1px solid #bbbbbb;
    top: 59px;
  }
`;

const UserUntactList = () => {
  const [buttonState, setButtonState] = useState(false);

  const toggleButtonState = () => {
    setButtonState(!buttonState);
  };

  return (
    <CardContainer>
      <ProfileImage src={DoctorImage} alt="Profile" />
      <UserInfo>
        <UserName>
          김정원<span>님</span>
        </UserName>
        <AppointmentInfo>
          <Icon src={IconDoctor} alt="Doctor" />
          <InfoText>재활의학과 전문의</InfoText>
          <DateContain>
            <Icon src={IconDate} alt="Date" />
            <InfoText>2023/08/30 16:00</InfoText>
          </DateContain>
        </AppointmentInfo>
        <AppointmentInfo>
          <Icon src={IconHospital} alt="Hospital" />
          <InfoText>한림대학교 춘천성심병원</InfoText>
        </AppointmentInfo>
      </UserInfo>
      <Button onClick={toggleButtonState} clicked={buttonState}>
        {buttonState ? "예약 시간이 아닙니다" : "입장"}
      </Button>
      <Button cancelButton topPosition="59px">
        예약 취소
      </Button>
    </CardContainer>
  );
};

export default UserUntactList;
