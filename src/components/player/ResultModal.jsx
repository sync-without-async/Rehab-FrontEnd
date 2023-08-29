import { styled } from "styled-components";

import Modal from "../Modal.jsx";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { hide, selectProps } from "../../redux/modalSlice.js";
import { useNavigate } from "react-router";
import { useMemo } from "react";

const Container = styled.div`
  min-height: 180px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  font-family: "SUIT Variable";
`;

const Title = styled.p`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
`;

const List = styled.div`
  margin: 12px 24px;
  display: grid;
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

const Button = styled.button`
  width: 160px;
  margin: auto;
  padding: 12px 0;
  border: none;
  font-size: 18px;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(20, 242, 198, 1);

  transition: background-color 0.2s;

  &:hover {
    background-color: #38f0a0;
  }

  cursor: pointer;
`;

const id = "exercise_result";

const ResultModal = () => {
  const navigate = useNavigate();
  const { time, percentage } = useSelector(selectProps(id)) ?? {};

  const minute = Math.floor(time / 60);
  const second = time - minute * 60;

  const score = useMemo(() => {
    if (percentage > 0.9) {
      return "Perfect";
    }

    if (percentage > 0.75) {
      return "Great";
    }

    if (percentage > 0.5) {
      return "Good";
    }

    return "Bad;";
  }, [percentage]);

  return (
    <Modal id={id} onHide={() => navigate("/")}>
      <Container>
        <Title>운동 결과</Title>
        <List>
          <Text>전체 소요 시간</Text>
          <Text>
            {minute}:{second}
          </Text>
          <Text>정확도</Text>
          <Text>{Math.round(percentage * 1000) / 10}%</Text>
          <Text>판정</Text>
          <Text>{score}</Text>
        </List>
        <Button onClick={() => navigate("/")}>종료하기</Button>
      </Container>
    </Modal>
  );
};

export default ResultModal;
