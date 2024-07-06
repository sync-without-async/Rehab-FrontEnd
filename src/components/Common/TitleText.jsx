import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "../Button/Button.jsx";
import { useNavigate } from "react-router";

const Container = styled.h1`
  width: 100%;
  height: 70px;
  color: black;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  gap: 16px;

  &.small {
    height: 50px;

    & > p {
      font-size: 28px;
    }

    & > a {
      padding: 0 24px;
      height: 30px;
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

const Text = styled.p`
  flex-grow: 1;
  font-size: 32px;
  font-weight: 800;
`;

const LinkButton = styled(Button)`
  width: auto;
  height: 36px;
  padding: 0 48px;
  font-size: 14px;
  font-weight: 500;
`;

const TitleText = ({ small, text, buttons }) => {
  const navigate = useNavigate();
  return (
    <Container className={classNames({ small })}>
      <Text>{text}</Text>
      {buttons.map((item, index) => (
        <LinkButton
          key={index}
          type="primary"
          onClick={() => (item.callback ? item.callback() : navigate(item.to))}
        >
          {item.text}
        </LinkButton>
      ))}
    </Container>
  );
};

TitleText.propTypes = {
  small: PropTypes.bool,
  text: PropTypes.string,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      to: PropTypes.string,
    }),
  ),
};

TitleText.defaultProps = {
  small: false,
  text: "",
  buttons: [],
};

export default TitleText;
