import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";
import { useState } from "react";

const Background = styled.div`
  width: 100%;
  height: 250px;
  background-color: #14f2c6;
  position: relative;
  margin-top: 20px;
`;

const DumbbellImage = styled.img`
  position: absolute;
  bottom: 80px;
  left: 118px;
`;

const ProgramText = styled.p`
  position: absolute;
  font-size: 50px;
  bottom: 20px;
  left: 118px;
  font-family: "SUIT Variable";
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleText = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
`;

const VideoTitleText = styled.h2`
  font-weight: bold;
  margin-bottom: 10px;
  margin-left: -210px;
`;

const VideoUploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 350px;
  height: 250px;
  border: 1px solid #ddd;
  background-color: black;
  color: white;
  cursor: pointer;
`;

const VideoUploadBox = styled.input.attrs({
  type: "file",
  accept: "video/*",
})`
  display: none;
`;

const VideoPreview = styled.video`
  width: 350px;
  height: 250px;
`;

const StyledInput = styled.input`
  width: 400px;
  height: 50px;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom:20px;
`;

const StyledTextarea = styled.textarea`
  width: 400px;
  height: 120px;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 2px solid #ddd;
  padding: 10px;
`;

const TextContainer = styled.div`
  margin-left: 20px;
`;

const AddExercise = () => {
  const [videoSrc, setVideoSrc] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <Header />
      <Background>
        <DumbbellImage src={dumbbell} alt="Dumbbell" />
        <ProgramText>운동 등록하기</ProgramText>
      </Background>

      <ContentContainer>
        <UploadContainer>
          <VideoTitleText>가이드 영상 업로드</VideoTitleText>
          <VideoUploadLabel>
            {videoSrc ? (
              <VideoPreview controls src={videoSrc}></VideoPreview>
            ) : (
              "등록하기"
            )}
            <VideoUploadBox onChange={handleVideoChange} />
          </VideoUploadLabel>
        </UploadContainer>

        <TextContainer>
          <TitleText>운동 제목 등록</TitleText>
          <StyledInput
            placeholder="최대 50글자까지 입력 가능합니다."
            maxLength={50}
          />

          <TitleText style={{ marginTop: "10px" }}>운동 설명 등록</TitleText>
          <StyledTextarea
            placeholder="최대 200글자까지 입력 가능합니다."
            maxLength={200}
          />
        </TextContainer>
      </ContentContainer>
    </div>
  );
};

export default AddExercise;
