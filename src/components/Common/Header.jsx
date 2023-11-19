import styled from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";
import mainlogo from "../../assets/icons/MainLogo.png";

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

const LogoImage = styled.img`
  width: 10%; 
  cursor: pointer;
`;

const Navigation = styled.div`
  display: flex;
  gap: 64px;
`;

const Item = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(228, 228, 228, 0.5);
  }
`;

const totalItems = [
  {
    id: "dev",
    value: "Developer's Page",
    link: "/dev",
    role: [
      ROLE_TYPE.VISITOR,
      ROLE_TYPE.USER,
      ROLE_TYPE.DOCTOR,
      ROLE_TYPE.THERAPIST,
    ],
  },
  {
    id: "register",
    value: "회원가입",
    link: "/register",
    role: [ROLE_TYPE.VISITOR],
  },
  {
    id: "add_exercise",
    value: "운동 등록",
    link: "/video/create",
    role: [ROLE_TYPE.THERAPIST],
  },
  {
    id: "dashboard",
    value: "대시보드",
    link: "/",
    role: [ROLE_TYPE.USER, ROLE_TYPE.DOCTOR, ROLE_TYPE.THERAPIST],
  },
  {
    id: "untact_appointment",
    value: "비대면 진료",
    link: "/meeting",
    role: [ROLE_TYPE.USER, ROLE_TYPE.DOCTOR, ROLE_TYPE.THERAPIST],
  },
  {
    id: "login",
    value: "로그인",
    link: "/login",
    role: [ROLE_TYPE.VISITOR],
  },
  {
    id: "logout",
    value: "로그아웃",
    link: "/logout",
    role: [ROLE_TYPE.USER, ROLE_TYPE.DOCTOR, ROLE_TYPE.THERAPIST],
  },
];

const Header = () => {
  const role = useSelector(selectRole);
  const navigate = useNavigate();
  const menuItems = totalItems.filter((item) => item.role.includes(role));

  return (
    <HeaderContainer>
        <LogoImage src={mainlogo} alt="Main Logo" onClick={() => navigate("/")} />
      <Navigation>
        {menuItems.map((item) => (
          <Item key={item.id} onClick={() => navigate(item.link)}>
            {item.value}
          </Item>
        ))}
      </Navigation>
    </HeaderContainer>
  );
};

export default Header;