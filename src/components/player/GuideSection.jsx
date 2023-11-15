import { useState, useEffect, useRef, useContext } from "react";
import styled from "styled-components";

import Player from "../../librarys/player";
import { ReducerContext } from "../../reducer/context.js";

const Container = styled.div`
  max-width: 420px;
  max-height: 480px;
  width: 100%;
  position: absolute;

  display: flex;
  flex-direction: column;
`;

const Video = styled.video`
  flex-shrink: 1;
  background-color: black;
  overflow: hidden;
`;

const Title = styled.p`
  left: 16px;
  top: 16px;
  position: absolute;

  font-size: 20px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);

  text-shadow:
    -1px -1px 1px rgba(0, 0, 0, 0.5),
    1px -1px 1px rgba(0, 0, 0, 0.5),
    -1px 1px 1px rgba(0, 0, 0, 0.5),
    1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Progress = styled.div.attrs((props) => ({
  style: {
    width:
      (props.$playback === null ? 0 : props.$playback / props.$duration) * 100 +
      "%",
  },
}))`
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
`;

const GuideSection = () => {
  const video = useRef(null);
  const [duration, setDuration] = useState(0);
  const [playback, setPlayback] = useState(null);
  const [state, dispatch] = useContext(ReducerContext);
  const { name, videoURL, guideStatus } = state;

  useEffect(() => {
    if (video) {
      if (guideStatus) {
        video.current.currentTime = 0;
        video.current.play();
      } else {
        video.current.pause();
      }
    }
  }, [guideStatus]);

  function onGuideLoad(event) {
    event.target.volume = 0;
    Player.guideDuration = event.target.duration;
  }

  function onTimeUpdate(event) {
    setPlayback(event.target.currentTime);
    setDuration(event.target.duration);
  }

  function onEnded() {
    dispatch({ type: "stopGuide" });
    if (video) {
      video.current.currentTime = 0;
    }
    Player.onGuideComplete();
  }

  return (
    <Container>
      <Title>{name}</Title>
      <Video
        ref={video}
        src={videoURL}
        onLoadedData={onGuideLoad}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
      />
      <ProgressContainer>
        <Progress $duration={duration} $playback={playback} />
      </ProgressContainer>
    </Container>
  );
};

export default GuideSection;
