import Header from "../components/Header";
import styled from "styled-components";
import dumbbell from "../assets/images/dumbbell.png";
import { useState } from "react";

import arms from "../assets/images/arms-up.webp";
import knee from "../assets/images/knee.webp";
import shoulder from "../assets/images/shoulder-up.webp";
import thigh from "../assets/images/thigh.webp";

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
`;

const categoryImages = {
  "팔": arms,
  "어깨": shoulder,
  "무릎": knee,
  "허벅지": thigh
};


const AddExercise = () => {
  const [videoSrc, setVideoSrc] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPose, setSelectedPose] = useState(null);

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVideoSrc(URL.createObjectURL(file));
    }
  };


  /* 백엔드 api 연결 함수 프론트단에서 임시로 구현*/
  const [courseData, setCourseData] = useState({
    video: null,
    title: "",
    description: "",
    category: null,
    posture: null,
  });

  const handleTitleChange = (e) => {
    setCourseData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e) => {
    setCourseData((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleRegister = () => {
    let existingCourses = JSON.parse(localStorage.getItem("courses")) || [];
    existingCourses.push({
      id: new Date().getTime(),
      ...courseData,
      category: selectedCategory,
      posture: selectedPose,
      image: categoryImages[selectedCategory], 
      tags: [selectedCategory, selectedPose]
    });
    localStorage.setItem("courses", JSON.stringify(existingCourses));
    alert("운동이 등록되었습니다.");
  
    // 초기화
    setCourseData({
      video: null,
      title: "",
      description: "",
      category: null,
      posture: null,
    });
    setSelectedCategory(null);
    setSelectedPose(null);
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
            value={courseData.title}
            onChange={handleTitleChange}
          />
          <TitleText>운동 설명 등록</TitleText>
          <StyledTextarea
            placeholder="최대 200글자까지 입력 가능합니다."
            maxLength={200}
            value={courseData.description}
            onChange={handleDescriptionChange}
          />
        </TextContainer>
      </ContentContainer>

      <TagsContainer>
        <TagRow>
          <TagTitleInline>카테고리 별</TagTitleInline>
          <TagButton
            selected={selectedCategory === "팔"}
            onClick={() => setSelectedCategory("팔")}
          >
            팔
          </TagButton>
          <TagButton
            selected={selectedCategory === "어깨"}
            onClick={() => setSelectedCategory("어깨")}
          >
            어깨
          </TagButton>
          <TagButton
            selected={selectedCategory === "무릎"}
            onClick={() => setSelectedCategory("무릎")}
          >
            무릎
          </TagButton>
          <TagButton
            selected={selectedCategory === "허벅지"}
            onClick={() => setSelectedCategory("허벅지")}
          >
            허벅지
          </TagButton>
        </TagRow>

        <TagRow>
          <TagTitleInline>자세 별</TagTitleInline>
          <TagButton
            selected={selectedPose === "선 자세"}
            onClick={() => setSelectedPose("선 자세")}
          >
            선 자세
          </TagButton>
          <TagButton
            selected={selectedPose === "앉은 자세"}
            onClick={() => setSelectedPose("앉은 자세")}
          >
            앉은 자세
          </TagButton>
          <TagButton
            selected={selectedPose === "누운 자세"}
            onClick={() => setSelectedPose("누운 자세")}
          >
            누운 자세
          </TagButton>
        </TagRow>
      </TagsContainer>
      <ContentContainer>
        <RegisterButton onClick={handleRegister}>등록하기</RegisterButton>
      </ContentContainer>
    </div>
  );
};

export default AddExercise;
