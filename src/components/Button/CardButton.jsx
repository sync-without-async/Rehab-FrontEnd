import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 10px;
  border: 1px solid #0064ff;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 24px 12px;
  cursor: pointer;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  transition:
    background-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
    background-color: #f9faff;
  }

  & > svg {
    width: 48px;
    height: 48px;
    color: rgb(32, 98, 206);
  }
`;

const Title = styled.p`
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  white-space: pre-wrap;
  color: rgb(32, 98, 206);
`;

const Description = styled.p`
  font-size: 13px;
  color: #000000;
  font-weight: 400;
  text-align: center;
  white-space: pre-wrap;
`;

const CardButton = ({ icon, title, description, link }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  return (
    <Container onClick={handleClick}>
      {icon}
      <Title>{title}</Title>
      <Description>{description}</Description>
    </Container>
  );
};

CardButton.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  link: PropTypes.string,
};

export default CardButton;
