import styled from 'styled-components';
import PropTypes from 'prop-types';
import XButton from '../../assets/icons/iconx.png';
import InputTextLong from '../Input/InputTextLong';
import DateSelect from '../Input/DateSelect';

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
  height: 600px;
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
  font-weight: bold;
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


export const DoctorChartWrite = ({ onClose }) => {
  const getCurrentDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>진료 기록 추가</Title>
        <CloseIcon src={XButton} alt="Close" onClick={onClose} />
        <Divider />
        <DateText>오늘 날짜: {getCurrentDate()}</DateText> 
        <InputTextLong label="진료 기록 작성*" />
        <InputTextLong label="재활치료사 재활 운동 요청서 작성*" />
        <DateSelect labelText="다음 외래 진료 일정 *" />
        <Button>기록 추가</Button>
      </ModalContainer>
    </Overlay>
  );
}

DoctorChartWrite.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DoctorChartWrite;