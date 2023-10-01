import { useState } from 'react';
import styled from 'styled-components';
import PatientImage from '../../assets/images/user/Opatient.png';
import IconDate from '../../assets/icons/icondate.png';

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
  margin-left:10px;
  margin-bottom:20px;
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

const DateContain = styled.div`

`

const Button = styled.button`
  width: 160px;
  height: 32px;
  background-color: ${props => props.cancelButton ? "#F3F3F3" : (props.clicked ? "#888888" : "#3592FF")};
  color: ${props => props.cancelButton ? "#000000" : (props.clicked ? "#444444" : "#FEFDFD")};
  border: ${props => props.cancelButton ? "1px solid #BBBBBB" : "none"};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  position: absolute;
  margin-left: 500px;
  top: ${props => (props.topPosition ? props.topPosition : "19px")};

  &:nth-child(2) {
    background-color: #F3F3F3;
    color: #000000;
    border: 1px solid #BBBBBB;
    top: 59px;
  }
`;

const DoctorSeveralReserve = () => {
  const [buttonState, setButtonState] = useState(false);

  const toggleButtonState = () => {
    setButtonState(!buttonState);
  }

  return (
    <CardContainer>
      <ProfileImage src={PatientImage} alt="Profile" />
      <UserInfo>
        <UserName>오소현<span>님</span></UserName>
          <DateContain>
          <Icon src={IconDate} alt="Date" />
          <InfoText>2023/08/30 16:00</InfoText>
          </DateContain>
      </UserInfo>
      <Button onClick={toggleButtonState} clicked={buttonState}>
        {buttonState ? "예약 시간이 아닙니다" : "입장"}
      </Button>
      <Button cancelButton topPosition="59px">상세 정보</Button>
    </CardContainer>
  );
};

export default DoctorSeveralReserve;