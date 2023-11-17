import styled from "styled-components";
import PropTypes from "prop-types";
import XButton from "../../assets/icons/iconx.png";
import InputTextLong from "../Input/InputTextLong";
import DoctorDetailChart from "../../components/DoctorDashBoard/DoctorDetailChart";

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
  background-color: #ffffff;
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
  margin-top: 10px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 290px;
  margin: 20px auto 0;
`;

const Button = styled.button`
  width: 140px;
  height: 30px;
  background-color: ${(props) => (props.primary ? "#3592FF" : "#F3F3F3")};
  color: ${(props) => (props.primary ? "#FEFDFD" : "#000000")};
  border: ${(props) => (props.primary ? "none" : "1px solid #BBBBBB")};
  font-weight: 300;
  font-size: 14px;
  border-radius: 10px;
  cursor: pointer;
`;

const StyledInputTextLong = styled(InputTextLong)`
  margin-top: 30px;
`;

export const DoctorCheckDetail = ({ onClose }) => {
  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>진료 예약 상세 정보</Title>
        <CloseIcon src={XButton} alt="Close" onClick={onClose} />
        <Divider />
        <DoctorDetailChart />
        <StyledInputTextLong label="진료 희망 사유" />
        <ButtonContainer>
          <Button primary>환자 차트 페이지로</Button>
          <Button>예약 취소</Button>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
};

DoctorCheckDetail.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default DoctorCheckDetail;
