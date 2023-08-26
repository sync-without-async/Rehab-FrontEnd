import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import SampleVideo from "../../assets/videos/sample_video.mp4";

const Container = styled.div`
  max-width: 20%;
  min-width: 280px;
  width: 100%;
  position: absolute;

  display: flex;
  flex-direction: column;
`;

const Video = styled.video`
  width: 100%;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Progress = styled.div.attrs((props) => ({
  style: {
    width: (props.playback / props.duration) * 100 + "%",
  },
}))`
  height: 100%;
  background-color: rgba(255, 255, 255, 1);
`;

const GuideSection = ({ play }) => {
  const video = useRef(null);
  const [duration, setDuration] = useState(0);
  const [playback, setPlayback] = useState(0);
  const [timer, setTimer] = useState(null);

  function videoHook() {
    if (video) {
      setPlayback(video.current.currentTime);
      setDuration(video.current.duration);
    }
  }

  useEffect(() => {
    if (video) {
      video.current.addEventListener("play", () => {
        setTimer(setInterval(videoHook, 50));
      });
      video.current.addEventListener("pause", () => {
        clearInterval(timer);
        setTimer(null);
      });
    }
  }, [video, timer]);

  return (
    <Container>
      <Video ref={video} src={SampleVideo} />
      <ProgressContainer>
        <Progress duration={duration} playback={playback} />
      </ProgressContainer>
    </Container>
  );
};

export default GuideSection;
