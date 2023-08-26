import { useState, useEffect, useContext, useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import GuideSection from "../components/player/GuideSection.jsx";
import ControllerSection from "../components/player/ControllerSection.jsx";
import Subtitle from "../components/player/Subtitle.jsx";

import SampleVideo from "../assets/videos/sample_video.mp4";
import { DispatchContext, StateContext } from "../librarys/context.js";

import { intialModalState, modalReducer } from "../reducer/modal.js";
import StartupModal from "../components/player/StartupModal.jsx";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: rgba(0, 0, 0, 1);

  font-family: "SUITE Variable", sans-serif;
`;

const Camera = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PlayerPage = () => {
  const [state, dispatch] = useReducer(modalReducer, intialModalState);

  useEffect(() => {
    dispatch({ type: "show", payload: "startup_notice" });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Container>
          <StartupModal />
          <Camera src={SampleVideo} />
          <GuideSection />
          <Subtitle
            text="화면의 사각형 영역에 전신이 들어오도록 카메라를 조정해주세요.
준비되면 “시작하기” 버튼을 누르세요."
          />
          <ControllerSection />
        </Container>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default PlayerPage;
