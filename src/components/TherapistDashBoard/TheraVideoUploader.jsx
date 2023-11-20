import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import SkeletonVideo from "../Skeleton/SkeletonVideo";
import { getSkeletons } from "../../librarys/api/ai.js";
import classNames from "classnames";
import { useRef } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { ReducerContext } from "../../reducer/context.js";
import data from "../../librarys/data.js";

const VideoUploadContainer = styled.div`
  margin-top: 18px;
  width: 720px;
  height: 300px;
  background-color: #dfdfdf;
  border: 1px solid #ababab;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;

const UploadText = styled.span`
  color: #878787;
  font-size: 36px;
  text-align: center;
`;

const HiddenInput = styled.input`
  display: none;
`;

const VideoPreview = styled(SkeletonVideo)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const TheraVideoUploader = () => {
  const input = useRef(null);
  const [state, dispatch] = useContext(ReducerContext);
  const { skeleton } = state;
  const url = useMemo(
    () => (state.video ? URL.createObjectURL(state.video) : null),
    [state.video],
  );

  const handleVideoChange = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // 클라이언트 단에서 영상 띄우기
    dispatch({
      type: "video",
      payload: file,
    });

    // AI에게 영상 binary를 전송
    const formData = new FormData();
    formData.append("video_file", file);
    const skeleton = await getSkeletons(formData);
    // const skeleton = JSON.parse(data);

    // 스켈레톤 받아오면 등록
    dispatch({
      type: "skeleton",
      payload: skeleton,
    });
  };

  function handleMetadata(event) {
    dispatch({
      type: "duration",
      payload: Number(event.target.duration),
    });
  }

  function onClick() {
    if (input && url === null) {
      input.current.click();
    }
  }

  return (
    <VideoUploadContainer
      onClick={onClick}
      className={classNames({ disable: url !== null })}
    >
      <HiddenInput
        ref={input}
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
      />
      {url ? (
        <VideoPreview src={url} skeleton={skeleton} onLoad={handleMetadata} />
      ) : (
        <UploadText>
          여기를 클릭해서 <br /> 동영상 업로드
        </UploadText>
      )}
    </VideoUploadContainer>
  );
};

TheraVideoUploader.propTypes = {
  onUpload: PropTypes.func,
};

export default TheraVideoUploader;
