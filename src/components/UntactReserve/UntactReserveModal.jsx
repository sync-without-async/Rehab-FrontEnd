import styled from 'styled-components';
import PropTypes from 'prop-types';
import XButton from '../../assets/icons/iconx.png';
import Calendar from '../Calender/Calender.jsx';
import { useState } from 'react';
import InputTextLong from '../Input/InputTextLong';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  width: 600px;
  height: 700px;
  background-color: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  display: inline-block;
`;

const CloseIcon = styled.img`
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  margin-top:10px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const DateText = styled.p`
  font-size: 16px;
  margin-top: -10px;
`;

const TimeButton = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  border: ${({ status }) => (status === 'selected' ? '1px solid #0064FF' : '1px solid #E8E8E8')};
  background-color: ${({ status }) => (status === 'available' ? '#FAFAFA' : status === 'selected' ? '#F3F1FF' : '#888888')};
  color: ${({ status }) => (status === 'closed' ? '#444444' : '#000000')};
  cursor: ${({ status }) => (status === 'closed' ? 'not-allowed' : 'pointer')};
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }
`;

const TimeButtonContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left:8px;
  gap:5px;
`;

const Button = styled.button`
  width: 140px;
  height: 30px;
  background-color: #3592FF;
  font-weight: 300;
  color: #FEFDFD;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top:20px;
  display: block;     
  margin-left: auto;
  margin-right: auto; 
`;


export const UntactReserveModal = ({ onClose }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const times = [
    { label: "18:00", status: "available" },
    { label: "18:30", status: "available" },
    { label: "19:00", status: "available" },
    { label: "19:30", status: "closed" },
    { label: "20:00", status: "closed" },
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>예약 정보 작성</Title>
        <CloseIcon src={XButton} alt="Close" onClick={onClose} />
        <Divider />
        <DateText>날짜 선택 *</DateText>
        <Calendar />
        <DateText>시간 선택 *</DateText>
        <TimeButtonContainer>
          {times.map(time => (
            <TimeButton
              key={time.label}
              status={time.label === selectedTime ? 'selected' : time.status}
              onClick={() => time.status === 'available' && handleTimeSelect(time.label)}
              disabled={time.status === 'closed'}
            >
              {time.label}
            </TimeButton>
          ))}
        </TimeButtonContainer>
        <InputTextLong label="진료 희망 사유*" />
        <Button>예약 신청</Button>
      </ModalContainer>
    </Overlay>
  );
}

UntactReserveModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default UntactReserveModal;
