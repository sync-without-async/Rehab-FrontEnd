import styled from "styled-components";
import PropTypes from "prop-types";
import { MdBrowserNotSupported } from "react-icons/md";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #afafaf;
  grid-column-end: span 10;
`;

const Wrapper = styled.div`
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const Text = styled.p`
  font-size: 16px;
  line-height: 16px;
`;

const EMPTY_MESSAGE = "표시할 항목이 없습니다.";

const Empty = ({ height = "200px", message = EMPTY_MESSAGE }) => {
  return (
    <Container style={{ height }}>
      <MdBrowserNotSupported size={36} />
      <Wrapper>
        <Text>{message}</Text>
      </Wrapper>
    </Container>
  );
};

Empty.propTypes = {
  height: PropTypes.string,
  message: PropTypes.string,
};

export default Empty;
