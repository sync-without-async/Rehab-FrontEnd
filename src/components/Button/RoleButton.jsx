import { useState } from "react";
import styled from "styled-components";
import Patient from "../../assets/images/user/Opatient.png";
import Doctor from "../../assets/images/user/Odoctor.png";
import Therapist from "../../assets/images/user/Otherapist.png";

const Button = styled.button`
  width: 240px;
  height: 50px;
  border-radius: 10px;
  background-color: #f3f3f3;
  border: ${({ isSelected }) =>
    isSelected ? "3px solid #AD5DFD" : "1px solid #BBBBBB"};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
  font-size: 18px;
  color: #333;
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
`;

const RoleButton = ({ role, isSelected, onSelectRole }) => {
  let iconSrc, buttonText;

  switch (role) {
    case "patient":
      iconSrc = Patient;
      buttonText = "환자";
      break;
    case "doctor":
      iconSrc = Doctor;
      buttonText = "전문의";
      break;
    case "therapist":
      iconSrc = Therapist;
      buttonText = "재활치료사";
      break;
    default:
      throw new Error("Invalid role provided");
  }

  return (
    <Button isSelected={isSelected} onClick={onSelectRole}>
      <Icon src={iconSrc} alt={buttonText} />
      {buttonText}
    </Button>
  );
};

export default RoleButton;
