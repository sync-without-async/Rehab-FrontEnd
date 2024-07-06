import { useMemo, useState } from "react";
import styled from "styled-components";
import Patient from "../../assets/images/user/Opatient.png";
import Doctor from "../../assets/images/user/Odoctor.png";
import Therapist from "../../assets/images/user/Otherapist.png";
import PropTypes from "prop-types";

const Button = styled.button`
  width: 240px;
  height: 50px;
  border-radius: 10px;
  background-color: #f3f3f3;
  border: ${(props) =>
    props.$isSelected ? "3px solid #AD5DFD" : "1px solid #BBBBBB"};
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

function getRoleData(role) {
  switch (role) {
    case "patient":
      return {
        icon: Patient,
        text: "환자",
      };
    case "doctor":
      return {
        icon: Doctor,
        text: "전문의",
      };
    case "therapist":
      return {
        icon: Therapist,
        text: "재활치료사",
      };
    default:
      throw new Error("Invalid role provided");
  }
}

const RoleButton = ({ role, selected, onSelect }) => {
  const { icon, text } = useMemo(() => getRoleData(role), [role]);

  return (
    <Button $isSelected={selected} onClick={onSelect}>
      <Icon src={icon} alt={text} />
      {text}
    </Button>
  );
};

RoleButton.propTypes = {
  role: PropTypes.oneOf(["patient", "doctor", "therapist"]).isRequired,
  selected: PropTypes.bool,
  onSelect: PropTypes.func,
};

export default RoleButton;
