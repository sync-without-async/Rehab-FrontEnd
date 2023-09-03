import { useEffect, useRef, useMemo, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { ImSpinner2 } from "react-icons/im";

const Container = styled.div`
  display: grid;
  background-color: #000000;
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  overflow: hidden;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);

  &.disable {
    visibility: hidden;
  }
`;

const Text = styled.p`
  margin-top: 12px;
  font-size: 12px;
  text-align: center;
`;

const Icon = styled(ImSpinner2)`
  width: 48px;
  height: 48px;
  animation: spin 5s infinite linear;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    from {
      transform: rotate(-360deg);
    }
  }
`;

const Canvas = styled.canvas`
  margin: auto;
  grid-column: 1;
  grid-row: 1;
  z-index: 1;
  overflow: hidden;
`;

function processSkeleton(data) {
  if (!data || typeof data !== "object") {
    return null;
  }

  const result = [];

  for (const [key, value] of Object.entries(data)) {
    for (const i in value) {
      const index = Number(i);
      const item = value[index];

      let find = result.find((element) => element.index === index);

      if (!find) {
        find = { index };
        result.push(find);
      }

      find[key] = item;
    }
  }

  return result;
}

/** @param {CanvasRenderingContext2D} context */
function drawLines(context, data, skeletons, ratio) {
  context.beginPath();

  skeletons.forEach((skeleton, index) => {
    let [x, y] = data[skeleton].map((item) => item * ratio);

    if (index === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  });

  context.stroke();
  context.closePath();
}

function drawPoints(context, data, ratio) {
  const size = 4;

  Object.entries(data).forEach(([key, value]) => {
    if (key === "index") {
      return;
    }

    let [x, y] = value.map((item) => item * ratio);
    context.fillRect(x - size / 2, y - size / 2, size, size);
  });
}

const SkeletonVideo = ({ src, skeleton, onLoad, ...props }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const data = useMemo(
    () => (skeleton ? processSkeleton(skeleton.skeletons) : null),
    [skeleton],
  );
  const [aspectRatio, setAspectRatio] = useState("");
  const [videoStatus, setVideoStatus] = useState(false);

  function drawSkeletons() {
    if (!canvasRef || !videoRef || !data) {
      return;
    }

    const canvas = canvasRef.current;
    const video = videoRef.current;

    /** @type {CanvasRenderingContext2D} */
    const context = canvas.getContext("2d");

    const [videoWidth, videoHeight] = getContainedSize(video);

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    const ratio = canvas.width / video.videoWidth;
    const delta = video.duration / data.length;
    const currentFrame = Math.min(
      Math.floor(video.currentTime / delta),
      data.length - 1,
    );

    context.clearRect(0, 0, 2000, 2000);

    if (!data || isNaN(currentFrame)) {
      return;
    }

    context.fillStyle = "#ffffff";
    context.strokeStyle = "#00ff00";
    context.lineWidth = 2;

    const lines = [
      [
        "left_wrist",
        "left_elbow",
        "left_shoulder",
        "left_hip",
        "left_knee",
        "left_ankle",
      ],
      [
        "right_wrist",
        "right_elbow",
        "right_shoulder",
        "right_hip",
        "right_knee",
        "right_ankle",
      ],
      ["left_hip", "right_hip"],
      ["left_shoulder", "right_shoulder"],
      ["left_ear", "left_eye", "nose", "right_eye", "right_ear"],
    ];

    for (const line of lines) {
      drawLines(context, data[currentFrame], line, ratio);
    }

    drawPoints(context, data[currentFrame], ratio);
  }

  function getContainedSize(video) {
    const ratio = video.videoWidth / video.videoHeight;
    let width = video.clientHeight * ratio;
    let height = video.clientHeight;
    if (width > video.clientWidth) {
      width = video.clientWidth;
      height = video.clientWidth / ratio;
    }
    return [width, height];
  }

  function getWidthAndHeight(event) {
    onLoad(event);
    setAspectRatio(event.target.videoWidth / event.target.videoHeight);
    drawSkeletons(event);
    event.target.volume = 0;
  }

  function onPlay() {
    setVideoStatus(true);
  }

  function onPause() {
    setVideoStatus(false);
    drawSkeletons();
  }

  function onEnded(e) {
    setVideoStatus(false);
    e.target.currentTime = 0;
    drawSkeletons();
    event.target.play();
  }

  function onResize() {
    drawSkeletons();
  }

  useEffect(() => {
    const render = () => {
      if (videoStatus) {
        drawSkeletons();
      }

      requestAnimationFrame(render);
    };

    render();
  }, [videoStatus]);

  useEffect(() => {
    if (skeleton && videoRef) {
      videoRef.current.play();
    }
  }, [skeleton]);

  return (
    <Container ref={containerRef} style={{ aspectRatio }} {...props}>
      <Canvas
        ref={canvasRef}
        onClick={() => {
          if (videoRef) {
            videoRef.current.play();
          }
        }}
      />
      <Loading className={!skeleton ? null : "disable"}>
        <Icon />
        <Text>처리중입니다...</Text>
      </Loading>
      <Video
        ref={videoRef}
        src={src}
        onLoadedMetadata={getWidthAndHeight}
        onPlay={onPlay}
        onPause={onPause}
        onEnded={onEnded}
        onResize={onResize}
      />
    </Container>
  );
};

SkeletonVideo.propTypes = {
  src: PropTypes.string,
  skeleton: PropTypes.object,
  onLoad: PropTypes.func,
};

SkeletonVideo.defaultProps = {
  skeleton: null,
  onLoad: () => {},
};

export default SkeletonVideo;
