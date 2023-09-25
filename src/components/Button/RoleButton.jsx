import { useState } from 'react';
import styled from 'styled-components';
import Patient from "../../assets/images/user/Opatient.png";
import Doctor from "../../assets/images/user/Odoctor.png";
import Therapist from "../../assets/images/user/Otherapist.png";

const Button = styled.button`
  width: 320px;
  height: 72px;
  border-radius: 10px;
  background-color: #F3F3F3;
  border: ${({ isSelected }) => (isSelected ? '3px solid #AD5DFD' : '1px solid #BBBBBB')};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 700;
  font-size: 24px;
  color: #333; 
`;

const Icon = styled.img`
  width: 40px;  
  height: 40px; 
`;

const RoleButton = ({ role }) => {
  const [isSelected, setIsSelected] = useState(false);
  let iconSrc, buttonText;

  switch(role) {
    case 'patient':
      iconSrc = Patient;
      buttonText = "환자";
      break;
    case 'doctor':
      iconSrc = Doctor;
      buttonText = "전문의";
      break;
    case 'therapist':
      iconSrc = Therapist;
      buttonText = "재활치료사";
      break;
    default:
      throw new Error("Invalid role provided");
  }

  const handleButtonClick = () => {
    setIsSelected(!isSelected);
  }

  return (
    <Button isSelected={isSelected} onClick={handleButtonClick}>
      <Icon src={iconSrc} alt={buttonText} />
      {buttonText}
    </Button>
  );
}

export default RoleButton;

