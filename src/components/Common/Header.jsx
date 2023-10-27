import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  min-width: 1200px;
  width: 100%;
  height: 60px;
  padding: 0 48px;
  background-color: #ffffff;
  box-shadow: 0 0px 12px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const Navigation = styled.div`
  display: flex;
  gap: 64px;
`;

const Item = styled.div`
  cursor: pointer;
`;

const totalItems = [
  {
    id: "intro",
    value: "서비스 소개",
    link: "/",
    role: ["VISITOR"],
  },
  {
    id: "register",
    value: "회원가입",
    link: "/signup",
    role: ["VISITOR"],
  },
  {
    id: "add_exercise",
    value: "운동 등록",
    link: "/theraexerciseadd",
    role: ["ADMIN_DOCTOR"],
  },
  {
    id: "user_dashboard",
    value: "나의 수강",
    link: "/",
    role: ["USER"],
  },
  {
    id: "admin_dashboard",
    value: "대시보드",
    link: "/",
    role: ["ADMIN_DOCTOR", "ADMIN_THERAPIST"],
  },
  {
    id: "untact_appointment",
    value: "비대면 진료",
    link: "/theramakeassgin",
    role: ["USER", "ADMIN_DOCTOR", "ADMIN_THERAPIST"],
  },
  {
    id: "login",
    value: "로그인",
    link: "/login",
    role: ["VISITOR"],
  },
  {
    id: "logout",
    value: "로그아웃",
    link: "/logout",
    role: ["USER", "ADMIN_DOCTOR", "ADMIN_THERAPIST"],
  },
];

export default function Header({ role }) {
  const navigate = useNavigate();
  const menuItems = totalItems.filter((item) => item.role.includes(role));

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/")}>Re:Hab</Logo>
      <Navigation>
        {menuItems.map((item) => (
          <Item key={item.id} onClick={() => navigate(item.link)}>
            {item.value}
          </Item>
        ))}
      </Navigation>
    </HeaderContainer>
  );
}

Header.propTypes = {
  role: PropTypes.string,
};

Header.defaultProps = {
  role: "VISITOR",
};
