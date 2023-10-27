import styled from "styled-components";
import PropTypes from "prop-types";
import BackIcon from "../../assets/icons/Page-left.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

const Container = styled.div`
  width: 800px;
  margin-bottom: 20px;
  display: flex;
`;

const Icon = styled(MdOutlineArrowBackIos)`
  margin-right: 10px;
  vertical-align: middle;
  width: 20px;
  height: 20px;
`;

const Text = styled.span`
  vertical-align: middle;
`;

const BackButton = ({ text, to }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <Button type="icon" onClick={() => navigate(to)}>
        <Icon src={BackIcon} alt="Back" />
        <Text>{text}</Text>
      </Button>
    </Container>
  );
};

BackButton.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
};

BackButton.defaultProps = {
  to: "/",
  text: "이전 페이지",
};

export default BackButton;
