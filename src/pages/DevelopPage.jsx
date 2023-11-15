import { Link } from "react-router-dom";
import styled from "styled-components";
import PageContainer from "../components/Common/PageContainer.jsx";
import BlockContainer from "../components/Common/BlockContainer.jsx";
import TitleText from "../components/Common/TitleText.jsx";

const Wrapper = styled.div`
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
`;

const Btn = styled.button`
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  background-color: #3592ff;
  border-radius: 5px;
  transition: background-color 0.3s;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #2c75e0;
  }
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: #ffffff;
`;
const Text = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: #362b6a;
`;

const routes = [
  {
    path: "/dev",
    title: "/dev",
    description: "개발 메인 페이지",
  },
  {
    path: "/login",
    title: "/login",
    description: "로그인",
  },
  {
    path: "/register",
    title: "/register",
    description: "회원가입",
  },
  {
    path: "/",
    title: "/",
    description: "대시보드",
  },
  {
    path: "/meeting",
    title: "/meeting",
    description: "비대면 진료 예약 목록",
  },
  {
    path: "/meeting/create",
    title: "/meeting/create",
    description: "비대면 진료 예약 생성",
  },
  {
    path: "/meeting/room/a5c831ae-0807-447e-8603-242ec8fc3840",
    title: "/meeting/room/:uuid",
    description: "비대면 진료 Room 입장",
  },
  {
    path: "/chart",
    title: "/chart",
    description: "환자 차트 목록",
  },
  {
    path: "/chart/example_id",
    title: "/chart/:id",
    description: "환자 차트 상세 조회",
  },
  {
    path: "/chart/create",
    title: "/chart/create",
    description: "환자 차트 생성",
  },
  {
    path: "/chart/example_id/assign",
    title: "/chart/:id/assign",
    description: "환자 차트 과제 할당",
  },
  {
    path: "/video",
    title: "/video",
    description: "재활치료사 전체 운동 목록",
  },
  {
    path: "/video/create",
    title: "/video/create",
    description: "재활치료사 운동 등록",
  },
  {
    path: "/program/1",
    title: "/program/:id",
    description: "프로그램 수강",
  },
];

const DevelopPage = () => {
  return (
    <PageContainer>
      <BlockContainer>
        <TitleText text="Developers Page" />
        <Wrapper>
          {routes.map((route) => (
            <Link key={route.path} to={route.path}>
              <Btn>
                <Title>{route.title}</Title>
                <Text>{route.description}</Text>
              </Btn>
            </Link>
          ))}
        </Wrapper>
      </BlockContainer>
    </PageContainer>
  );
};

export default DevelopPage;
