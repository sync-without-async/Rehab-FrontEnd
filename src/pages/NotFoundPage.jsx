import styled from "styled-components";
import BlockContainer from "../components/Common/BlockContainer.jsx";
import PageContainer from "../components/Common/PageContainer.jsx";
import Button from "../components/Button/Button.jsx";
import { useNavigate } from "react-router-dom";

const Container = styled(BlockContainer)`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
`;

const Message = styled.p`
  font-size: 24px;
  font-weight: 600;
`;

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <PageContainer>
      <Container>
        <Message>찾으시는 페이지가 존재하지 않습니다.</Message>
        <Button type="primary" onClick={() => navigate("/")}>
          메인 페이지로
        </Button>
      </Container>
    </PageContainer>
  );
};

export default NotFoundPage;
