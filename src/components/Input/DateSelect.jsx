import styled from "styled-components";
import { useState, useRef, useEffect } from "react";
import Datetime from "react-datetime";
import IconCalender from "../../assets/icons/iconcalender.png";
import "react-datetime/css/react-datetime.css";
import PropTypes from "prop-types";
import Conditional from "../Common/Conditional.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const DateInput = styled.input`
  box-sizing: border-box;
  width: 200px;
  height: 40px;
  border-radius: 10px;
  background-color: #fafafa;
  border: 1px solid #bbbbbb;
  margin-right: 10px;
  padding-left: 12px;
  font-size: 14px;
  outline: none;
  caret-color: transparent;
  cursor: pointer;
`;

const CalendarButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #fafafa;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 10px;
  background-image: url(${IconCalender});
  background-size: 25px 25px;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #bbbbbb;
`;

const CalendarModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const DATE_FORMAT = "YYYY-MM-DD";

const DateSelect = ({ labelText, onChange }) => {
  const [date, setDate] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const modalRef = useRef(null);

  const handleClickButton = () => {
    setModalVisible((state) => !state);
  };

  const handleChangeCalendar = (value) => {
    const formattedDate = value.format(DATE_FORMAT);

    setDate(formattedDate);
    setModalVisible(false);

    if (onChange) {
      onChange(formattedDate);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setModalVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const modalComponent = (
    <>
      <Overlay onClick={() => setModalVisible(false)} />
      <CalendarModal ref={modalRef}>
        <Datetime
          input={false}
          timeFormat={false}
          dateFormat={DATE_FORMAT}
          value={date}
          onChange={handleChangeCalendar}
        />
      </CalendarModal>
    </>
  );

  return (
    <Container>
      <Label>{labelText}</Label>
      <InputContainer>
        <DateInput
          type="text"
          value={date}
          placeholder="날짜를 선택해주세요."
          onClick={handleClickButton}
          readOnly
        />
        <CalendarButton type="button" onClick={handleClickButton} />
      </InputContainer>
      <Conditional condition={isModalVisible} content={modalComponent} />
    </Container>
  );
};

DateSelect.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default DateSelect;
