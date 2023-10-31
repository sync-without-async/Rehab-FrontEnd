import styled from "styled-components";
import TheraVideoUploader from "./TheraVideoUploader";
import InputTextContainer from "../Input/InputTextContainer";
import InputAreaContainer from "../Input/InputAreaContainer";
import SelectCategory from "../Button/SelectCategory";
import TitleText from "../Common/TitleText";
import BlockContainer from "../Common/BlockContainer";
import { ReducerContext } from "../../reducer/context.js";
import { intialUploadState, uploadReducer } from "../../reducer/upload.js";
import { createVideo } from "../../librarys/api/video.js";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";

const InputText = styled(InputTextContainer)`
  width: 240px;
  margin-right: 32px;
`;

const InputArea = styled(InputAreaContainer)`
  width: 100%;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const Button = styled.button`
  width: 210px;
  height: 40px;
  background-color: #3592ff;
  font-weight: 300;
  color: #fefdfd;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const TheraExerciseAdd = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(uploadReducer, intialUploadState);
  const { title, description, video, skeleton } = state;

  const handleChange = (type) => {
    return (e) => dispatch({ type, payload: e.target.value });
  };

  const handleTagChange = (value) => {
    dispatch({
      type: "category",
      payload: value,
    });
  };

  async function upload() {
    if (video === null) {
      alert("동영상을 업로드해주세요.");
      return;
    }

    if (skeleton === null) {
      alert("동영상의 처리가 완료될 때까지 기다려주세요.");
      return;
    }

    if (title.length < 1) {
      alert("제목을 2자 이상 입력해주세요.");
      return;
    }

    if (description.length < 1) {
      alert("설명을 2자 이상 입력해주세요.");
      return;
    }

    const blob = new Blob([JSON.stringify(skeleton)], {
      type: "application/json",
    });

    const options = {
      ...state,
      id: "ldh",
      totalFrame: parseInt(skeleton.video_length),
      skeleton: blob,
    };

    const programResponse = await createVideo(options);
    console.log(programResponse);

    alert("비디오를 성공적으로 게시했습니다.");
    navigate("/");
  }

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <TitleText text="운동 등록" />
        <TheraVideoUploader />
        <FlexContainer>
          <InputText
            label="운동 제목 *"
            value={title}
            onChange={handleChange("title")}
          />
          <SelectCategory onChange={(item) => handleTagChange(item)} />
        </FlexContainer>
        <InputArea
          label="운동 설명 *"
          value={description}
          onChange={handleChange("description")}
        />
        <Button onClick={upload}>운동 등록</Button>
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default TheraExerciseAdd;
