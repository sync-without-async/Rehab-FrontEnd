import styled from "styled-components";
import PropTypes from "prop-types";

import Modal from "../Common/Modal.jsx";

import { hide, selectProps } from "../../redux/modalSlice.js";
import { useSelector } from "react-redux";
import ModalTitleText from "../Common/ModalTitleText.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import Button from "../Button/Button.jsx";
import { deleteReservation } from "../../librarys/api/reservation.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { selectRole } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
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

const notReadyText = "아직 비대면 진료 요약이 생성되지 않았습니다.";

const ReservationInfoModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const value = useSelector(selectProps(id));
  const { patientId, reservationId, description, summary } = value || {};
  const role = useSelector(selectRole);

  async function onChartButtonClick() {
    navigate("/chart-id/" + patientId);

    dispatch(hide(id));
  }
  async function onCancelButtonClick() {
    const response = await deleteReservation(reservationId);

    if (response.status) {
      toast.success("예약이 성공적으로 취소되었습니다.");
    }

    dispatch(hide(id));
  }

  return (
    <Modal id={id}>
      <Container>
        <ModalTitleText text="진료 예약 상세 정보" id={id} />
        <Input label="진료 희망 사유" value={description} disabled={true} />
        <Input
          label="AI 비대면 진료 요약"
          value={summary || notReadyText}
          disabled={true}
        />
        <ButtonContainer>
          {role !== ROLE_TYPE.USER ? (
            <Button type="primary" onClick={onChartButtonClick}>
              환자 차트 페이지로
            </Button>
          ) : null}
          <Button onClick={onCancelButtonClick}>예약 취소</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

ReservationInfoModal.propTypes = {};

export default ReservationInfoModal;
