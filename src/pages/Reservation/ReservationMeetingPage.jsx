import styled from "styled-components";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RTCClient } from "../../librarys/webrtc/rtc-client.js";
import { AudioRecorder } from "../../librarys/webrtc/rtc-recorder.js";
import dayjs from "dayjs";

const Container = styled.div`
  height: 100%;
`;

const VideoContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;

const VideoWrapper = styled.div`
  width: 50vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: #1f1f1f;
`;

const Description = styled.p`
  margin-top: -64px;
  font-size: 24px;
  text-align: center;
  color: white;
  text-shadow: 0px 2px 2px #0000007f;
`;

const Status = styled.p`
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  color: white;
  text-align: center;
  font-size: 3.5vw;
  font-weight: 600;
`;

const Menu = styled.div`
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  font-size: 16px;
  background-color: #0000003f;
  color: white;
  border-radius: 256px;
  position: absolute;
  display: flex;
  gap: 16px;
`;

const Button = styled.button`
  padding: 2px 16px;
  border-radius: 256px;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0000001f;
  }
`;

const ReservationMeetingPage = () => {
  const navigate = useNavigate();
  const clientVideo = useRef(null);
  const remoteVideo = useRef(null);
  const { uuid } = useParams();
  const [remoteStatus, setRemoteStatus] = useState("연결되지 않음");
  const [peer, setPeer] = useState(new RTCClient());
  const [recorder, setRecorder] = useState(new AudioRecorder());

  useEffect(() => {
    const unload = () => {
      peer.destory();
    };

    peer.addEventListener("stream", onStream);
    peer.addEventListener("disconnect", () => {
      recorder.stop();
      setRemoteStatus("연결 종료");
    });
    peer.addEventListener("open", () => setRemoteStatus(""));

    recorder.addEventListener("complete", (event) => {
      const blob = event.detail.data;
      const sampleRate = event.detail.sampleRate;
    });

    window.addEventListener("beforeunload", unload);

    (async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      peer.connect(uuid, "user", stream);

      clientVideo.current.volume = 0;
      clientVideo.current.srcObject = stream;
    })();

    return () => {
      peer.destory();
      window.removeEventListener("beforeunload", unload);
    };
  }, []);

  async function onStream(event) {
    const stream = event.detail;

    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    recorder.start(audioStream);
    remoteVideo.current.srcObject = stream;
  }

  return (
    <Container>
      <VideoContainer>
        <VideoWrapper>
          <Video ref={clientVideo} autoPlay />
          <Description>클라이언트</Description>
        </VideoWrapper>
        <VideoWrapper>
          <Video ref={remoteVideo} autoPlay />
          <Status>{remoteStatus}</Status>
          <Description>상대방</Description>
        </VideoWrapper>
      </VideoContainer>
      <Menu>
        <Button onClick={() => navigate("/")}>나가기</Button>
      </Menu>
    </Container>
  );
};

export default ReservationMeetingPage;
