import styled from "styled-components";
import PropTypes from "prop-types";
import classNames from "classnames";

import { MdOutlineClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { hide } from "../../redux/modalSlice.js";

const Container = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Text = styled.h1`
  vertical-align: center;
  color: black;
  font-size: 32px;
  font-weight: 800;
`;

const Icon = styled(MdOutlineClose)`
  width: 36px;
  height: 36px;
  color: #cccccc;

  cursor: pointer;
`;

const ModalTitleText = ({ id, text }) => {
  const dispatch = useDispatch();
  return (
    <Container>
      <Text>{text}</Text>
      <Icon onClick={() => dispatch(hide(id))} />
    </Container>
  );
};

ModalTitleText.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
};

ModalTitleText.defaultProps = {
  text: "",
};

export default ModalTitleText;
