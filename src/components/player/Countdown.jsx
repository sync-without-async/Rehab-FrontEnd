import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { ReducerContext } from "../../reducer/context.js";

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  position: absolute;

  left: 50%;
  bottom: 220px;

  position: absolute;
  transform: translateX(-50%);

  text-align: center;
  font-size: 72px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);

  z-index: 2;

  text-shadow:
    -1px -1px 1px rgba(0, 0, 0, 0.5),
    1px -1px 1px rgba(0, 0, 0, 0.5),
    -1px 1px 1px rgba(0, 0, 0, 0.5),
    1px 1px 1px rgba(0, 0, 0, 0.5);

  @keyframes countdown {
    0% {
      transform: translateX(-50%) translateY(-10%);
      opacity: 0;
    }

    10% {
      transform: translateX(-50%) translateY(-10%);
      opacity: 0;
    }

    25% {
      transform: translateX(-50%) translateY(0%);
      opacity: 1;
    }

    75% {
      transform: translateX(-50%) translateY(0%);
      opacity: 1;
    }

    90% {
      transform: translateX(-50%) translateY(10%);
      opacity: 0;
    }

    100% {
      transform: translateX(-50%) translateY(10%);
      opacity: 0;
    }
  }
`;

const Countdown = () => {
  const [state, dispatch] = useContext(ReducerContext);
  const { countdown } = state;
  const ref = useRef(null);
  const [text, setText] = useState(null);

  useEffect(() => {
    if (ref) {
      if (countdown) {
        ref.current.style.animation = "countdown 1s infinite forwards";
      } else {
        ref.current.style.animation = "";
      }
      setText(countdown);
    }
  }, [countdown]);

  return <Container ref={ref}>{text}</Container>;
};

Countdown.propTypes = {
  text: PropTypes.string,
};

export default Countdown;
