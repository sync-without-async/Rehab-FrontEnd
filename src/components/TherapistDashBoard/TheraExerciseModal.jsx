import { styled } from "styled-components";

import Modal from "../Common/Modal.jsx";

import { selectProps } from "../../redux/modalSlice.js";
import { useSelector } from "react-redux";
import ModalTitleText from "../Common/ModalTitleText.jsx";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const ExerciseVideo = styled.video`
  width: 100%;
  height: 400px;
  margin-bottom: 32px;
  background-color: #dfdfdf;
  border: 1px solid #ababab;
  border-radius: 10px;
`;

const id = "therapist_video_preview";

const TheraExerciseModal = () => {
  const value = useSelector(selectProps(id));

  return (
    <Modal id={id}>
      <Container>
        <ModalTitleText text="가이드 영상" id={id} />
        <ExerciseVideo src={value} controls />
      </Container>
    </Modal>
  );
};

export default TheraExerciseModal;
