import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../Common/Modal.jsx";

import { selectProps } from "../../redux/modalSlice.js";
import { useSelector } from "react-redux";
import ModalTitleText from "../Common/ModalTitleText.jsx";
import ChartSummary from "../Chart/ChartSummary.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import Button from "../Button/Button.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const Chart = styled(ChartSummary)`
  margin-top: 16px;
  width: 100%;
`;

const Input = styled(InputAreaContainer)`
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin-top: 8px;
  margin-bottom: 32px;
  display: flex;
  gap: 24px;
`;

const id = "reservation_detail";

const ReservationInfoModal = () => {
  const value = useSelector(selectProps(id));
  const { description, aiSummary } = value || {};

  return (
    <Modal id={id}>
      <Container>
        <ModalTitleText text="진료 예약 상세 정보" id={id} />
        <Chart />
        <Input label="진료 희망 사유" value={description} disabled={true} />
        <Input label="AI 비대면 진료 요약" value={aiSummary} disabled={true} />
        <ButtonContainer>
          <Button type="primary">환자 차트 페이지로</Button>
          <Button>예약 취소</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

ReservationInfoModal.propTypes = {};

export default ReservationInfoModal;
