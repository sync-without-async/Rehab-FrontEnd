import { styled } from "styled-components";

import Modal from "../Common/Modal.jsx";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";
import { hide, selectProps } from "../../redux/modalSlice.js";
import { useNavigate } from "react-router";
import { useMemo } from "react";

import { ImSpinner2 } from "react-icons/im";
import Button from "../Button/Button.jsx";
import TitleText from "../Common/TitleText.jsx";
import { useDispatch } from "react-redux";
import { METRICS_GRADE } from "../../librarys/type.js";

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

const Text = styled.p`
  margin: 12px 0;
  font-size: 18px;

  &:nth-child(2n) {
    text-align: right;
    font-size: 20px;
  }
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
  color: #f2f2f2;
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

const id = "exercise_result";

const ResultModal = () => {
  const navigate = useNavigate();
  const props = useSelector(selectProps(id));
  const { time, percentage } = props || {};

  const minute = Math.floor(time / 60);
  const second = time - minute * 60;

  const score = useMemo(() => {
    for (const { metrics, grade } of METRICS_GRADE) {
      if (percentage <= metrics) {
        return grade;
      }
    }
  }, [percentage]);

  const LoadingBlock = (
    <Block>
      <Loading />
      <p>점수를 측정하는 중...</p>
    </Block>
  );

  const ResultBlock = (
    <>
      <Text>치료 소요 시간</Text>
      <Text>
        {minute}:{second}
      </Text>
      <Text>정확도</Text>
      <Text>{Math.round(percentage * 1000) / 10}%</Text>
      <Text>판정</Text>
      <Text>{score}</Text>
    </>
  );

  return (
    <Modal id={id} preventClose>
      <Container>
        <TitleText text="치료 결과" small />
        <List>{percentage ? ResultBlock : LoadingBlock}</List>
        <Button type="primary" onClick={() => navigate("/")}>
          종료하기
        </Button>
      </Container>
    </Modal>
  );
};

export default ResultModal;
