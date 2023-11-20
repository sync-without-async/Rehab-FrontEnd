import { FaWindowClose } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
  width: 300px;
`;

const Text = styled.p`
  font-size: 16px;
`;

const Empty = () => {
  return (
    <Container>
      <FaWindowClose />
      <Text>표시할 항목이 없습니다.</Text>
    </Container>
  );
};

export default Empty;
