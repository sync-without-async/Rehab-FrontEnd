import styled from "styled-components";
import Modal from "../Common/Modal.jsx";
import ModalTitleText from "../Common/ModalTitleText.jsx";
import Button from "../Button/Button.jsx";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { hide } from "../../redux/modalSlice.js";

import PropTypes from "prop-types";
import InputTextContainer from "../Input/InputTextContainer.jsx";
import { getDisplayTime, isEmail } from "../../librarys/util.js";
import { toast } from "react-toastify";
import {
  postEmailVerification,
  requestEmailVerification,
} from "../../librarys/api/user.js";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const CodeSendButton = styled(Button)`
  width: initial;
`;

const SubmitButton = styled(Button)`
  margin-top: 16px;
  margin-bottom: 32px;
`;

const Wrapper = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: 1fr 160px;
  grid-column-gap: 24px;
  grid-row-gap: 28px;

  align-items: flex-end;
`;

const Timer = styled.p`
  height: 40px;
  border: 1px solid #bbbbbb;
  border-radius: 16px;
  font-weight: 400;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #6f6f6f;

  &.active {
    border: 1px solid #3592ff;
    color: #3592ff;
  }
`;

const id = "register_email_verify";

const VERIFY_TIME_LIMIT = 60 * 5;

export const EmailVerificationModal = ({ onSubmit }) => {
  const reduxDispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [expireTime, setExpireTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const intervalId = useRef(null);

  const displayTime = getDisplayTime(expireTime - currentTime);

  const timerClass = expireTime <= currentTime ? null : "active";

  function setData(callback) {
    return (event) => {
      const value = event.target.value;
      callback(value);
    };
  }

  async function onSendClick() {
    if (email === "") {
      toast.error("이메일 주소를 입력해주세요.");
      return;
    }

    if (isEmail(email) === false) {
      toast.error("유효한 이메일 형식이 아닙니다. 다시 입력해주세요.");
      return;
    }

    if (intervalId.current) {
      toast.error(
        "기존 인증 코드가 만료된 이후에 새로운 코드를 발급 받을 수 있습니다.",
      );
      return;
    }

    // API 요청이 진행 중인 경우
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      await requestEmailVerification(email);
      toast.info(`인증 코드가 "${email}" 으로 전송되었습니다.`);
    } catch (error) {
      console.error(error);
      toast.error("인증 코드 전송에 실패했습니다.");
      setLoading(false);
      return;
    }

    setLoading(false);

    const expire = performance.now() / 1000 + VERIFY_TIME_LIMIT;
    setExpireTime(expire);
    setCurrentTime(performance.now() / 1000);

    intervalId.current = setInterval(() => {
      const currentTime = performance.now() / 1000;
      setCurrentTime(currentTime);

      if (currentTime >= expire) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    }, 100);
  }

  async function onSubmitClick() {
    if (email === "") {
      toast.error("이메일을 입력하세요.");
      return;
    }

    if (code === "") {
      toast.error("인증 코드를 입력하세요.");
      return;
    }

    // API 요청이 진행 중인 경우
    if (loading) {
      return;
    }

    try {
      await postEmailVerification(email, code);
    } catch (error) {
      const res = error.response;

      if (res.data === "Email verification failed") {
        toast.error("인증 코드가 일치하지 않습니다. 다시 입력해주세요.");
        return;
      }

      console.error(error);
      toast.error("인증 코드 검증 서버 요청이 실패했습니다.");
      return;
    }

    toast.info("이메일 인증에 성공했습니다!");
    onSubmit(email);

    reduxDispatch(hide(id));
  }

  function onToggle() {
    setEmail("");
    setCode("");
    setExpireTime(0);
    setCurrentTime(0);

    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }

  return (
    <Modal id={id} onToggle={onToggle}>
      <Container>
        <ModalTitleText text="이메일 인증" id={id} />
        <Wrapper>
          <InputTextContainer
            label="이메일 *"
            name="email"
            value={email}
            onChange={setData(setEmail)}
            placeholder="doctor1234@hallym.ac.kr"
          />
          <CodeSendButton type="info" onClick={onSendClick}>
            인증 코드 전송
          </CodeSendButton>
          <InputTextContainer
            label="인증 코드 *"
            name="code"
            value={code}
            onChange={setData(setCode)}
            placeholder="이메일로 전송된 인증 코드를 입력해주세요."
          />
          <Timer className={timerClass}>{displayTime}</Timer>
        </Wrapper>
        <SubmitButton type="primary" onClick={onSubmitClick}>
          이메일 확인
        </SubmitButton>
      </Container>
    </Modal>
  );
};

EmailVerificationModal.propTypes = {
  onSubmit: PropTypes.func,
};

export default EmailVerificationModal;
