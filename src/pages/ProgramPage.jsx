import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Player from "../librarys/player.js";

import GuideSection from "../components/player/GuideSection.jsx";
import ControllerSection from "../components/player/ControllerSection.jsx";
import Subtitle from "../components/player/Subtitle.jsx";
import Countdown from "../components/player/Countdown.jsx";

import StartupModal from "../components/player/StartupModal.jsx";
import ResultModal from "../components/player/ResultModal.jsx";
import { intialPlayerState, playerReducer } from "../reducer/player.js";
import { useDispatch } from "react-redux";
import { show, hide } from "../redux/modalSlice.js";
import BorderBox from "../components/player/BorderBox.jsx";
import { ReducerContext } from "../reducer/context.js";
import { getVideo } from "../librarys/api/program.js";
import { toast } from "react-toastify";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 1);
`;

const Camera = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scaleX(-1);
`;

const ProgramPage = () => {
  const { id } = useParams();
  const [state, dispatch] = useReducer(playerReducer, intialPlayerState);
  const modalDispatch = useDispatch();
  const { subtitle, videoId } = state;
  const cameraRef = useRef(null);

  useEffect(() => {
    modalDispatch(show("startup_notice"));
    modalDispatch(hide("exercise_result"));

    window.testFunc = (time, percentage) => {
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

    Player.clearInstance();

    Player.onComplete = (time, percentage) => {
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
    getVideo(Number(id)).then((data) => {
      if (!data) {
        toast.error("프로그램 데이터를 불러오는데 실패했습니다.");
        return;
      }

      dispatch({ type: "setName", payload: data.title });
      dispatch({
        type: "setVideo",
        payload: {
          id: data.id,
          url: data.videoURL,
        },
      });
      Player.name = data.title;
    });
  }, []);

  useEffect(() => {
    if (videoId) {
      Player.videoId = videoId;
    }
  }, [videoId]);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
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
    </ReducerContext.Provider>
  );
};

export default ProgramPage;
