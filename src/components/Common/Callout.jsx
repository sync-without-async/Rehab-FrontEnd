import styled from "styled-components";
import PropTypes from "prop-types";
import { MdInfo } from "react-icons/md";

const Container = styled.div`
  padding: 12px 18px;
  border: 1px solid #0085ff;
  border-radius: 10px;
  background-color: #f7faff;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Icon = styled(MdInfo)`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

const Title = styled.p`
  color: #0064ff;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  font-weight: 700;
  display: flex;
  align-items: center;
`;

const Content = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
  font-weight: 400;
`;

const Callout = ({ title, content }) => {
  return (
    <Container>
      <Title>
        <Icon />
        {title}
      </Title>
      <Content>{content}</Content>
    </Container>
  );
};

Callout.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default Callout;
