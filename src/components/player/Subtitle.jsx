import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  max-width: 700px;
  width: 100%;
  position: absolute;

  left: 50%;
  bottom: 128px;

  position: absolute;
  transform: translateX(-50%);

  white-space: pre-line;

  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: rgba(255, 255, 255, 1);

  text-shadow:
    -1px -1px 1px rgba(0, 0, 0, 0.5),
    1px -1px 1px rgba(0, 0, 0, 0.5),
    -1px 1px 1px rgba(0, 0, 0, 0.5),
    1px 1px 1px rgba(0, 0, 0, 0.5);
`;

const Subtitle = ({ text }) => {
  return <Container>{text}</Container>;
};

Subtitle.propTypes = {
  text: PropTypes.string,
};

export default Subtitle;
