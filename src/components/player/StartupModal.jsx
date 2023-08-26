import { styled } from "styled-components";

import Modal from "../Modal.jsx";

import { useContext, useState } from "react";
import { DispatchContext, StateContext } from "../../librarys/context.js";

const Container = styled.div`
  min-height: 240px;
  margin: 16px;
  display: flex;
  flex-direction: column;
  font-family: "SUIT Variable";
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const List = styled.ul`
  margin: 0 24px;
`;

const Text = styled.li`
  margin: 12px 0;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 18px 0;
  border: none;
  font-size: 16px;
  color: rgba(0, 0, 0, 1);
  background-color: rgba(20, 242, 198, 1);

  transition: background-color 0.2s;

  &:hover {
    background-color: #38f0a0;
  }

  cursor: pointer;
`;

const id = "startup_notice";

const StartupModal = () => {
  const dispatch = useContext(DispatchContext);
  const { props } = useContext(StateContext);

  return (
    <Modal id={id}>
      <Container>
        <Title>안내사항</Title>
        <List>
          <Text>본 과정은 사용자의 신체 녹화를 필요로 합니다.</Text>
          <Text>
            현재 기기에 카메라가 없다면, 웹캠과 같은 외부 카메라를 연결한 다음
            본 페이지를 새로고침하세요.
          </Text>
          <Text>
            브라우저가 카메라 권한을 요구하는 경우, 허용을 눌러주세요.
          </Text>
          <Text>카메라가 준비되었으면, 확인을 눌러서 시작하세요.</Text>
        </List>
      </Container>
      <Button onClick={() => dispatch({ type: "hide" })}>확인</Button>
    </Modal>
  );
};

export default StartupModal;
