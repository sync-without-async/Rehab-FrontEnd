import { useState, useEffect, useContext, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Player from "../librarys/player.js";

import GuideSection from "../components/player/GuideSection.jsx";
import ControllerSection from "../components/player/ControllerSection.jsx";
import Subtitle from "../components/player/Subtitle.jsx";

import SampleVideo from "../assets/videos/sample_video.mp4";
import { DispatchContext, StateContext } from "../librarys/context.js";

import { intialModalState, modalReducer } from "../reducer/modal.js";
import StartupModal from "../components/player/StartupModal.jsx";
import { intialPlayerState, playerReducer } from "../reducer/player.js";

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
  // const [state, dispatch] = useReducer(modalReducer, intialModalState); <- redux로 변경
  const [state, dispatch] = useReducer(playerReducer, intialPlayerState);
  const { subtitle, countdown } = state;
  const cameraRef = useRef(null);

  useEffect(() => {
    // dispatch({ type: "show", payload: "startup_notice" });
    Player.dispatch = dispatch;
    Player.getVideoStream()
      .then((stream) => {
        if (cameraRef) {
          cameraRef.current.srcObject = stream;
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Container>
          {/* <StartupModal /> */}
          <Camera ref={cameraRef} autoPlay />
          <GuideSection />
          <Subtitle text={subtitle + " " + (countdown || "")} />
          <ControllerSection />
        </Container>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default PlayerPage;
