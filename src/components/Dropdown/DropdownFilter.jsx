import  { useState } from 'react';
import styled from 'styled-components';
import dropdownicon from "../../assets/icons/dropdownicon.png";

const Label = styled.div`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 3.75px;
  margin-top:-10px;
  padding-top: 7.5px;
`;

const DropdownContainer = styled.div`
  width: 200px;
  height: 40px;
  background-color: #FFFFFF;
  border: 0.75px solid #BBBBBB; 
  position: relative;
  cursor: pointer;
  margin-bottom: 7.5px;
  border-radius: 7.5px;
  box-shadow: 0px 1.5px 3px rgba(0, 0, 0, 0.1); 
`;

const DropdownText = styled.input`
  width: calc(100% - 45px); 
  height: 100%;
  border: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  font-size: 16px;
  padding-left: 7.5px;
  &:focus {
    outline: none;
  }
`;

const DropdownIcon = styled.img`
  position: absolute;
  right: 7.5px;
  top: 50%;
  transform: translateY(-50%);
`;

const DropdownList = styled.div`
  width: 100%;
  max-height: ${props => (props.open ? '112.5px' : '0')}; 
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #FFFFFF;
  border: 0.75px solid #ccc;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 7.5px;
`;

function DropdownFilter({ label, items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('정렬 선택'); // 초기값을 '정렬 선택'으로 설정

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setText(item); 
    setIsOpen(false); 
  };

  return (
    <div>
      <Label>{label}</Label>
      <DropdownContainer onClick={toggleDropdown}>
        <DropdownText 
          value={text} 
          onChange={e => setText(e.target.value)} 
          style={{fontSize: '14px', color: '#000000'}}
        />
        <DropdownIcon src={dropdownicon} alt="Dropdown Icon" />
        {isOpen && (
          <DropdownList open={isOpen}>
            {items.map((item, index) => (
              <DropdownItem key={index} onClick={() => handleItemClick(item)}>
                {item}
              </DropdownItem>
            ))}
          </DropdownList>
        )}
      </DropdownContainer>
    </div>
  );
}

export default DropdownFilter;
