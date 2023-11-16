import styled from 'styled-components';
import { useState, useRef, useEffect } from 'react';
import Datetime from 'react-datetime';
import IconCalender from '../../assets/icons/iconcalender.png';
import 'react-datetime/css/react-datetime.css';
import PropTypes from 'prop-types';

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
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  margin-right: 10px;  
`;

const CalendarButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #FAFAFA;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 10px;
  background-image: url(${IconCalender});
  background-size: 25px 25px; 
  background-repeat: no-repeat;
  background-position: center;
  border: 1px solid #BBBBBB;
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
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
`;

const DateSelect = ({ labelText, onChange }) => {
  const [date, setDate] = useState('');
  const [open, setOpen] = useState(false);

  const format = 'YYYY-MM-DD';

  const handleClickButton = () => {
    setOpen(!open);
  };

  const handleChangeCalendar = (selected) => {
    const formattedDate = selected.format(format);
    setDate(formattedDate);
    setOpen(false);
    if (onChange) onChange(formattedDate);
  };

  const getSeparator = () => {
    const regex = /[^0-9a-zA-Z]+/;
    const match = format.match(regex);

    if (match) {
      const symbol = match[0];
      const indexes = [];

      for (let i = 0; i < format.length; i++) {
        if (format[i] === symbol) {
          indexes.push(i);
        }
      }

      return { symbol, indexes };
    }
    return { symbol: undefined, indexes: [] };
  };

  const separator = getSeparator();

  const handleChangeDate = (e) => {
    let currentDate = e.target.value;

    if (separator.symbol && separator.indexes.length > 0) {
      separator.indexes.forEach((index) => {
        if (currentDate.length > index) {
          currentDate =
            currentDate.slice(0, index) +
            separator.symbol +
            currentDate.slice(index);
        }
      });
    }

    setDate(currentDate);
    if (onChange) onChange(currentDate);
  };

  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      {labelText && <Label>{labelText}</Label>} 
      <InputContainer>
        <DateInput
          type='text'
          value={date}
          placeholder='   날짜를 선택해주세요.'
          onChange={handleChangeDate}
        />
        <CalendarButton type='button' onClick={handleClickButton} />
      </InputContainer>
      {open && (
        <>
          <Overlay onClick={() => setOpen(false)} />
          <CalendarModal ref={modalRef}>
            <Datetime
              input={false}
              timeFormat={false}
              dateFormat={format}
              value={date}
              onChange={handleChangeCalendar}
            />
          </CalendarModal>
        </>
      )}
    </Container>
  );
};

DateSelect.propTypes = {
  labelText: PropTypes.string.isRequired,
  onChange: PropTypes.func
};

export default DateSelect;