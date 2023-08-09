import{styled, css} from 'styled-components';
import { MdSportsGymnastics } from "react-icons/md";
import { FaDumbbell } from "react-icons/fa";
import { IoBicycleSharp } from "react-icons/io5";
import { useState } from 'react';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 40px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px; 
`;

const Button = styled.button`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: white;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;

  ${props => props.active && css`
    color: rgba(255, 0, 0, 0.7);
    border: 5px solid rgba(255, 0, 0, 0.7);
  `}
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const iconSize = 80 * 0.5;

const CategoryButton = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  return (
    <ButtonWrapper>
      {['맨몸 운동', '바벨/덤벨 운동', '기구 운동'].map((text, index) => (
        <ButtonContainer key={index}>
          <Button active={activeButton === index} onClick={() => handleButtonClick(index)}>
            <IconWrapper>{index === 0 ? <MdSportsGymnastics size={iconSize} /> : index === 1 ? <FaDumbbell size={iconSize} /> : <IoBicycleSharp size={iconSize} />}</IconWrapper>
          </Button>
          <span style={{ color: activeButton === index ? 'rgba(255, 0, 0, 0.7)' : 'black' }}>{text}</span>
        </ButtonContainer>
      ))}
    </ButtonWrapper>
  );
};


export default CategoryButton;
