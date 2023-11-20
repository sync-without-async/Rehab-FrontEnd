import { styled } from "styled-components";

import Modal from "../Common/Modal.jsx";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { hide, selectProps } from "../../redux/modalSlice.js";
import { useNavigate } from "react-router";
import { useMemo } from "react";

import { ImSpinner2 } from "react-icons/im";
import { MdCheckCircle } from "react-icons/md";
import Button from "../Button/Button.jsx";
import TitleText from "../Common/TitleText.jsx";

const Container = styled.div`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.div`
  width: 100%;
  min-height: 120px;
  margin: 12px 24px;
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 1fr;
`;

const Block = styled.div`
  grid-column: 1 / span 2;

  text-align: center;

  & > p {
    margin-top: 8px;
    text-align: center;
  }
`;

const Loading = styled(ImSpinner2)`
  width: 36px;
  height: 36px;
  color: #5d5d5d;
  animation: spin 3s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    from {
      transform: rotate(-360deg);
    }
  }
`;

const Done = styled(MdCheckCircle)`
  width: 72px;
  height: 72px;
  color: #2ab56f;
`;

const id = "meeting_result";

const MeetingResultModal = () => {
  const navigate = useNavigate();
  const isComplete = useSelector(selectProps(id));

  const LoadingBlock = (
    <Block>
      <Loading />
      <p>AI 요약을 생성하기 위해서 서버로 음성을 전송하고 있습니다...</p>
    </Block>
  );

  const ResultBlock = (
    <Block>
      <Done />
      <p>서버로 전송이 완료되었습니다! 이제 나갈 수 있습니다.</p>
    </Block>
  );

  const statusType = useMemo(
    () => (isComplete ? "primary" : "disabled"),
    [isComplete],
  );

  return (
    <Modal id={id} preventClose>
      <Container>
        <TitleText text="음성 데이터 업로드 중" small />
        <List>{isComplete ? ResultBlock : LoadingBlock}</List>
        <Button type={statusType} onClick={() => navigate("/")}>
          {isComplete ? "나가기" : "잠시만 기다려주세요"}
        </Button>
      </Container>
    </Modal>
  );
};

export default MeetingResultModal;
