import  { useState } from 'react';
import styled from 'styled-components';
import dropdownicon from "../../assets/icons/dropdownicon.png";

const DropdownContainer = styled.div`
  width: 320px;
  height: 50px;
  background-color: #FFFFFF;
  position: relative;
  cursor: pointer;
`;

const DropdownText = styled.input`
  width: calc(100% - 60px); 
  height: 100%;
  border: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  font-size: 16px;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

const DropdownIcon = styled.img`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`;

const DropdownList = styled.div`
  width: 100%;
  max-height: ${props => (props.open ? '150px' : '0')}; 
  overflow-y: auto;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #FFFFFF;
  border: 1px solid #ccc;
  z-index: 1;
`;

const DropdownItem = styled.div`
  padding: 10px;
`;

function Dropdown({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer onClick={toggleDropdown}>
      <DropdownText value={text} onChange={e => setText(e.target.value)} />
      <DropdownIcon src={dropdownicon} alt="Dropdown Icon" />
      {isOpen && (
        <DropdownList open={isOpen}>
          {items.map((item, index) => <DropdownItem key={index}>{item}</DropdownItem>)}
        </DropdownList>
      )}
    </DropdownContainer>
  );
}

export default Dropdown;
