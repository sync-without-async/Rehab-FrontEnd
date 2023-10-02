import styled from "styled-components";
import IconDate from "../../assets/icons/icondate.png";
import { useState } from "react";

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  width: 320px;
  height: 120px;
  background-color: #ffffff;
  margin-bottom: 20px;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
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

const Button = styled.button`
  width: 120px;
  height: 28px;
  background-color: ${(props) =>
    props.cancelButton ? "#F3F3F3" : props.clicked ? "#888888" : "#3592FF"};
  color: ${(props) =>
    props.cancelButton ? "#000000" : props.clicked ? "#444444" : "#FEFDFD"};
  border: ${(props) => (props.cancelButton ? "1px solid #BBBBBB" : "none")};
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 14px;

`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 5px;
`;

const TheraReserve = () => {
  const [buttonState, setButtonState] = useState(false);

  const toggleButtonState = () => {
    setButtonState(!buttonState);
  };

  return (
    <CardContainer>
      <UserName>
        오소현<span>님</span>
      </UserName>
      <DateContainer>
        <Icon src={IconDate} alt="Date" />
        <InfoText>2023/08/30 16:00</InfoText>
      </DateContainer>
      <ButtonContainer>
        <Button onClick={toggleButtonState} clicked={buttonState}>
          {buttonState ? "예약 시간이 아님" : "입장"}
        </Button>
        <Button cancelButton>상세 정보</Button>
      </ButtonContainer>
    </CardContainer>
  );
};

export default TheraReserve;
