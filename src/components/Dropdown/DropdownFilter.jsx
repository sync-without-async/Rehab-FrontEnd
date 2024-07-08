import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import dropdownIcon from "../../assets/icons/down_icon.svg";

const Container = styled.div`
  position: relative;
  flex-grow: 1;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 3.75px;
  margin-top: -10px;
  padding-top: 7.5px;
`;

const DropdownContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 8px;
  border: 0.75px solid #bbbbbb;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 7.5px;
  box-shadow: 0px 1.5px 3px rgba(0, 0, 0, 0.1);
`;

const DropdownText = styled.p`
  border: none;
  font-weight: 500;
  font-size: 14px;
  flex-grow: 1;
`;

// const DropdownIcon = styled.div`
//   width: 36px;
//   height: 36px;
// `;

const DropdownList = styled.div`
  width: 100%;
  max-height: ${(props) => (props.open ? "120px" : "0px")};
  margin-top: 8px;
  overflow-y: auto;
  position: absolute;
  background-color: #ffffff;
  border: 0.75px solid #ccc;
  border-radius: 8px;
  z-index: 1;
  opacity: ${(props) => (props.open ? "1" : "0")};

  transition: all 0.25s;
`;

const DropdownItem = styled.div`
  padding: 7.5px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #dfdfdf;
  }
`;

function DropdownFilter({ label, items, defaultText, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setValue(item);
    setIsOpen(false);
    onSelect(item);
  };

  return (
    <Container>
      {label ? <Label>{label}</Label> : null}
      <DropdownContainer onClick={toggleDropdown}>
        <DropdownText>{value?.value || defaultText}</DropdownText>
        <img src={dropdownIcon} alt="Dropdown Icon" width={20} height={20} />
      </DropdownContainer>
      <DropdownList open={isOpen}>
        <DropdownItem onClick={() => handleItemClick(null)}>
          {defaultText}
        </DropdownItem>
        {items.map((item) => (
          <DropdownItem key={item.key} onClick={() => handleItemClick(item)}>
            {item.value}
          </DropdownItem>
        ))}
      </DropdownList>
    </Container>
  );
}

DropdownFilter.propTypes = {
  label: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  defaultText: PropTypes.string,
  onSelect: PropTypes.func,
};

DropdownFilter.defaultProps = {
  defaultText: "선택하기...",
};

export default DropdownFilter;
