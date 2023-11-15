import styled from "styled-components";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { show } from "../../redux/modalSlice.js";

const Container = styled.div`
  display: flex;
  padding: 15px;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: pointer;
  overflow: hidden;

  gap: 18px;

  transition:
    transform 0.25s,
    box-shadow 0.25s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.img`
  width: 120px;
  height: 88px;
  background-color: #dfdfdf;
  border: 1px solid #ababab;
  border-radius: 10px;
  object-fit: contain;
`;

const Info = styled.div`
  flex-shrink: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 20px;
  color: #000000;
  font-weight: 800;
`;

const Description = styled.div`
  height: 53px;
  font-size: 13px;
  color: #000000;
  overflow: hidden;
`;

const TheraSeveralExercise = ({ id, title, description, image, video }) => {
  const dispatch = useDispatch();

  function onClick() {
    dispatch(
      show({
        id: "therapist_video_preview",
        props: video,
      }),
    );
  }

  return (
    <Container onClick={onClick}>
      <Thumbnail src={image} />
      <Info>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Info>
    </Container>
  );
};

TheraSeveralExercise.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  video: PropTypes.string,
};

export default TheraSeveralExercise;
