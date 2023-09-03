import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";
import { useState, useRef, useEffect } from "react";

import arms from "../assets/images/arms-up.webp";
import knee from "../assets/images/knee.webp";
import shoulder from "../assets/images/shoulder-up.webp";
import thigh from "../assets/images/thigh.webp";

import axios from "axios";
import SkeletonVideo from "../components/SkeletonVideo";
import { getSkeletons } from "../librarys/skeleton-api";
import { createProgram, createVideo } from "../librarys/admin-api";
import { useSelector } from "react-redux";
import { selectEmail, selectToken } from "../redux/userSlice";
import { CATEGORY, POSITION } from "../librarys/type";

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
  font-weight: bold;
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

  &.disabled {
    pointer-events: none;
  }
`;

const VideoUploadBox = styled.input.attrs({
  type: "file",
  accept: "video/*",
})`
  display: none;
`;

const VideoPreview = styled(SkeletonVideo)`
  width: 350px;
  height: 250px;
`;

const StyledInput = styled.input`
  width: 400px;
  height: 50px;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 2px solid #000000;
  padding: 10px;
  margin-bottom: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 400px;
  height: 120px;
  margin-top: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  border: 2px solid #000000;
  padding: 10px;
`;

const TagTitle = styled.h3`
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-left: -110px;
`;

const TagRow = styled.div`
  display: flex;
  align-items: center;
`;

const TagTitleInline = styled(TagTitle)`
  margin-right: 20px;
  margin-left: 0;
`;

const TagButton = styled.button`
  background-color: ${(props) => (props.selected ? "#ACEAFF" : "#FFFFFF")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border: ${(props) => (props.selected ? "none" : "1px solid black")};
  border-radius: 10px;
  width: 140px;
  height: 40px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:focus {
    outline: none;
  }
`;

const TextContainer = styled.div`
  margin-left: 20px;
`;
const TagsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 50px;
`;

const RegisterButton = styled.button`
  width: 200px;
  height: 50px;
  background-color: #ad5dfd;
  color: white;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  transition: 0.3s ease;
  margin-bottom: 20px;

  &:hover {
    background-color: #8f47d4;
  }

  &:focus {
    outline: none;
  }

  &.disable {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const AddExercise = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);
  const [videoDuration, setVideoDuration] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDesctiption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPose, setSelectedPose] = useState(null);
  const [skeletonData, setSkeletonData] = useState(null);
  const [skeletonFrame, setSkeletonFrame] = useState(null);
  const userId = useSelector(selectEmail);
  const accessToken = useSelector(selectToken);

  const status = [
    // videoFile,
    selectedCategory,
    selectedPose,
    // skeletonData,
    title.length >= 2,
  ].every((item) => item);

  const handleVideoChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    setVideoFile(file);
    setVideoSrc(URL.createObjectURL(file));

    // AI에게 영상 binary를 전송
    const formData = new FormData();
    formData.append("video_file", file);

    const response = await getSkeletons(formData);

    console.log(response);
    setSkeletonData(response); // 스켈레톤 데이터 저장
    setSkeletonFrame(parseInt(response.video_length));
  };

  const handleRegister = async () => {
    // 프로그램을 먼저 등록하는 코드

    const programResponse = await createProgram(
      accessToken,
      userId,
      title,
      description,
      selectedCategory,
      selectedPose,
    );

    const programId = Object.values(programResponse)[0];

    const skeletonBlob = new Blob([JSON.stringify(skeletonData)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("actName", "기본 운동");
    formData.append("playTime", videoDuration);
    formData.append("frame", skeletonFrame);
    formData.append("guideWidth", skeletonData.video_width);
    formData.append("guideHeight", skeletonData.video_heigth);
    formData.append("files[0]", videoFile);
    formData.append("files[1]", skeletonBlob);

    const videoResponse = await createVideo(accessToken, programId, formData);

    console.log(videoResponse);
  };

  const handleVideoMetadataLoaded = (event) => {
    setVideoDuration(Number(event.target.duration));
  };

  /* 백엔드 api 연결 프론트단에서 임시로 구현*/
  const [courseData, setCourseData] = useState({
    video: null,
    title: "",
    description: "",
    category: null,
    posture: null,
  });

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDesctiption(e.target.value);
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
          <VideoUploadLabel className={videoSrc ? "disabled" : null}>
            {videoSrc ? (
              <VideoPreview
                src={videoSrc}
                skeleton={skeletonData}
                onLoad={handleVideoMetadataLoaded}
              ></VideoPreview>
            ) : (
              "등록하기"
            )}
            <VideoUploadBox onChange={handleVideoChange} />
          </VideoUploadLabel>
        </UploadContainer>

        <TextContainer>
          <TitleText>운동 제목</TitleText>
          <StyledInput
            placeholder="최대 50글자까지 입력 가능합니다."
            maxLength={50}
            value={title}
            onChange={handleTitleChange}
          />
          <TitleText>운동 설명</TitleText>
          <StyledTextarea
            placeholder="최대 200글자까지 입력 가능합니다."
            maxLength={200}
            value={description}
            onChange={handleDescriptionChange}
          />
        </TextContainer>
      </ContentContainer>

      <TagsContainer>
        <TagRow>
          <TagTitleInline>카테고리 별</TagTitleInline>
          {CATEGORY.map(({ key, value }) => (
            <TagButton
              key={key}
              selected={selectedCategory === key}
              onClick={() => setSelectedCategory(key)}
            >
              {value}
            </TagButton>
          ))}
        </TagRow>

        <TagRow>
          <TagTitleInline>자세 별</TagTitleInline>
          {POSITION.map(({ key, value }) => (
            <TagButton
              key={key}
              selected={selectedPose === key}
              onClick={() => setSelectedPose(key)}
            >
              {value} 자세
            </TagButton>
          ))}
        </TagRow>
      </TagsContainer>
      <ContentContainer>
        <RegisterButton
          className={status ? null : "disable"}
          onClick={handleRegister}
        >
          등록하기
        </RegisterButton>
      </ContentContainer>
    </div>
  );
};

export default AddExercise;
