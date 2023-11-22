import { FaWindowClose } from "react-icons/fa";
import styled from "styled-components";
import PropTypes from "prop-types";

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

const Icon = styled(FaWindowClose)`
  width: 48px;
  height: 48px;
`;

const Text = styled.p`
  font-size: 24px;
  line-height: 24px;
`;
const Description = styled.p`
  font-size: 12px;
  line-height: 12px;
`;

const Empty = ({ height }) => {
  return (
    <Container style={{ height }}>
      <Icon />
      <Wrapper>
        <Text>표시할 항목이 없습니다</Text>
        <Description>나중에 다시 와보세요!</Description>
      </Wrapper>
    </Container>
  );
};

Empty.propTypes = {
  height: PropTypes.string,
};

Empty.defaultProps = {
  height: "200px",
};

export default Empty;
