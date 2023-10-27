import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";

const Text = styled.h1`
  width: 100%;
  height: 70px;
  color: black;
  border-bottom: 1px solid #d9d9d9;
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;

  &.small {
    height: 50px;
    font-size: 28px;
  }
`;

const TitleText = ({ small, text }) => {
  return <Text className={classNames({ small })}>{text}</Text>;
};

TitleText.propTypes = {
  small: PropTypes.bool,
  text: PropTypes.string,
};

TitleText.defaultProps = {
  small: false,
  text: "",
};

export default TitleText;
