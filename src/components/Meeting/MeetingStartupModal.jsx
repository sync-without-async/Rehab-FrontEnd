import { styled } from "styled-components";
import Modal from "../Common/Modal.jsx";

import { useDispatch } from "react-redux";
import { hide } from "../../redux/modalSlice.js";
import TitleText from "../Common/TitleText.jsx";
import Button from "../Button/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { ReducerContext } from "../../reducer/context.js";

const Container = styled.div`
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const List = styled.ul`
  margin: 0 24px;
  margin-bottom: 16px;
`;

const Text = styled.li`
  margin: 12px 0;
  font-size: 16px;

  &.primary {
    font-weight: 500;
    color: #4939db;
  }

  &.disabled {
    font-weight: 500;
    color: #ab1b1b;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const id = "meeting_startup";

const MeetingStartupModal = () => {
  const [state, _] = useContext(ReducerContext);
  const { cameraStatus } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const statusType = useMemo(
    () => (cameraStatus ? "primary" : "disabled"),
    [cameraStatus],
  );

  const message = useMemo(() => {
    if (cameraStatus === null) {
      return "카메라를 불러오고 있습니다...";
    } else if (cameraStatus === false) {
      return "기기에서 카메라를 감지하지 못했습니다. 기기에 카메라가 잘 연결되었는지 확인한 다음 새로고침을 해보세요.";
    } else {
      return "웹캠이 준비되었고 시작할 수 있습니다! 시작하기 버튼을 눌러 시작하세요.";
    }
  }, [cameraStatus]);

  return (
    <Modal id={id} preventClose>
      <Container>
        <TitleText id={id} text="시작하기 전에" />
        <List>
          <Text>
            본 화상통화는 사용자의 카메라가 상대방에게 노출되며, 귀하의 음성이
            서버로 전송되어 AI 요약 서비스에 사용됩니다.
          </Text>
          <Text>
            아직 기기에 카메라가 없다면, 웹캠과 같은 외부 카메라를 연결한 다음
            본 페이지를 새로고침하세요.
          </Text>
          <Text>
            브라우저가 카메라 권한을 요구하는 경우, 허용을 눌러주세요.
          </Text>
          <Text className={statusType}>{message}</Text>
        </List>
        <ButtonWrapper>
          <Button type={statusType} onClick={() => dispatch(hide(id))}>
            시작하기
          </Button>
          <Button type="info" onClick={() => navigate("/")}>
            나가기
          </Button>
        </ButtonWrapper>
      </Container>
    </Modal>
  );
};

export default MeetingStartupModal;
