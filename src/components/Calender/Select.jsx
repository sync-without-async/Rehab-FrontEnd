import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import downArrowImage from "../../assets/icons/dropdownicon.png";

const Container = styled.div`
  display: inline-block;
`;

const SelectBox = styled.div`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  cursor: pointer;

  &.outline {
    padding: 8px 12px;
    border: 1px solid rgba(0, 0, 0, 0.25);
    color: rgba(102, 112, 128, 1);

    &.focus {
      outline: 2px solid black;
    }

    & > p {
      font-size: 16px;
      font-weight: 500;

      @media screen and (max-width: 500px) {
        font-size: 11px;
      }
    }
  }
`;

const Label = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
  object-fit: contain;

  @media screen and (max-width: 500px) {
    width: 12px;
    height: 12px;
  }
`;

const List = styled.div`
  min-width: 120px;
  max-height: 250px;
  border: 1px solid #0000003f;
  border-radius: 8px;
  overflow: auto;
  position: absolute;
  z-index: 1;
  background-color: white;
  box-shadow: 0px 0px 8px #0000002f;
  visibility: hidden;

  margin-top: 12px;
  opacity: 0;

  transition: all 0.2s;

  &.visible {
    margin-top: 4px;
    opacity: 1;
    visibility: visible;
  }
`;

const Item = styled.p`
  padding: 8px;
  font-size: 16px;
  transition: background-color 0.1s;
  cursor: pointer;

  @media screen and (max-width: 500px) {
    padding: 6px 8px;
    font-size: 12px;
  }

  &.select {
    background-color: #efefef;
  }

  &:hover {
    background-color: #dfdfdf;
  }
`;

const Select = ({ outline = false, list = [], value, onSelect, ...props }) => {
  const [selectedItem, setItem] = useState();
  const [isVisible, setVisible] = useState(false);
  const container = useRef(null);

  const eventCallback = (event) => {
    if (container.current && !container.current.contains(event.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", eventCallback, true);
    return () => {
      document.removeEventListener("click", eventCallback, true);
    };
  }, []);

  useEffect(() => {
    if (value) {
      const find = list.find((item) => item.id === value);

      if (find) {
        setItem(find);
      }
    }
  }, [value, list]);

  return (
    <Container {...props}>
      <SelectBox
        className={[
          isVisible ? "focus" : null,
          outline ? "outline" : null,
        ].join(" ")}
        ref={container}
        onClick={() => setVisible(!isVisible)}
      >
        <Label>{selectedItem?.name}</Label>
        <Icon src={downArrowImage} />
      </SelectBox>
      <List className={isVisible ? "visible" : ""}>
        {list.map((item) => (
          <Item
            key={item.id}
            className={item.id === selectedItem?.id ? "select" : ""}
            onClick={() => (setItem(item), onSelect(item))}
          >
            {item.name}
          </Item>
        ))}
      </List>
    </Container>
  );
};

Select.propTypes = {
  /** 선택할 목록입니다. 목록의 각 항목에는 반드시 고유한 id가 부여되어야 합니다. */
  list: PropTypes.arrayOf(
    PropTypes.shape({
      /** 항목의 id 입니다. id는 항목마다 고유한 값이어야만 합니다. */
      id: PropTypes.any.isRequired,
      /** 항목의 이름입니다. 이 값이 화면에 표시되게 됩니다. */
      name: PropTypes.string,
      /** 항목의 기본 값입니다. 이 값이 true면 맨 처음에 선택되어집니다. */
      default: PropTypes.bool,
    }),
  ),
  className: PropTypes.string,
  value: PropTypes.number,
  outline: PropTypes.bool,
  /** 목록에서 특정한 값이 선택되면 이 이벤트를 호출합니다. */
  onSelect: PropTypes.func,
};

export default Select;