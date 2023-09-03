import { useState, useEffect, useContext, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Player from "../librarys/player.js";

import GuideSection from "../components/player/GuideSection.jsx";
import ControllerSection from "../components/player/ControllerSection.jsx";
import Subtitle from "../components/player/Subtitle.jsx";
import Countdown from "../components/player/Countdown.jsx";

import { DispatchContext, StateContext } from "../librarys/context.jsx";
import StartupModal from "../components/player/StartupModal.jsx";
import ResultModal from "../components/player/ResultModal.jsx";
import { intialPlayerState, playerReducer } from "../reducer/player.js";
import { getCourse } from "../librarys/exercise-api.js";
import { useDispatch, useSelector } from "react-redux";
import { show } from "../redux/modalSlice.js";
import { selectEmail, selectToken } from "../redux/userSlice.js";
import { getVideo } from "../librarys/video-api.js";
import BorderBox from "../components/player/BorderBox.jsx";
import { modifyMetrics } from "../librarys/my-program-api.js";

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
  const { id } = useParams();
  const [state, dispatch] = useReducer(playerReducer, intialPlayerState);
  const modalDispatch = useDispatch();
  const { subtitle, videoId } = state;
  const cameraRef = useRef(null);
  const userId = useSelector(selectEmail);

  useEffect(() => {
    modalDispatch(show("startup_notice"));

    Player.onComplete = async (time, percentage) => {
      modalDispatch(
        show({
          id: "exercise_result",
          props: {
            time,
            percentage,
          },
        }),
      );
    };

    Player.dispatch = dispatch;
    Player.id = id;
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

  useEffect(() => {
    if (!userId) {
      return;
    }

    Player.userId = userId;

    getVideo(Number(id)).then((data) => {
      if (!data) {
        alert("프로그램 데이터를 불러오는데 실패했습니다.");
        return;
      }

      console.log(data);
      if (!Array.isArray(data.videoList) || data.videoList.length === 0) {
        alert("프로그램 가이드 영상이 없습니다. 영상을 추가하세요.");
        return;
      }

      dispatch({ type: "setName", payload: data.title });
      dispatch({
        type: "setVideo",
        payload: {
          id: data.videoList[0].vno,
          url: data.videoList[0].url,
        },
      });
      Player.name = data.title;
    });
  }, [userId]);

  useEffect(() => {
    if (videoId) {
      Player.videoId = videoId;
    }
  }, [videoId]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <Container>
          <StartupModal />
          <ResultModal />
          <BorderBox />
          <Camera ref={cameraRef} autoPlay />
          <GuideSection />
          <Countdown />
          <Subtitle text={subtitle} />
          <ControllerSection />
        </Container>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
};

export default PlayerPage;
