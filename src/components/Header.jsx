import styled from 'styled-components';

const HeaderWrapper = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #f5f5f5;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Header({ userType }) {
  const menuItems = {
    "default": ["서비스 소개", "회원가입", "로그인"],
    "admin1": ["관리자 대시보드", "실시간 비대면 진료", "로그아웃"],
    "admin2": ["운동 등록하기", "관리자 대시보드", "실시간 비대면 진료", "로그아웃"],
    "user": ["나의 수강 페이지", "실시간 비대면 진료", "로그아웃"]
  };

  return (
    <HeaderWrapper>
      <Logo>Re:Hab</Logo>
      <Nav>
        {menuItems[userType || "default"].map(item => (
          <NavItem key={item}>{item}</NavItem>
        ))}
      </Nav>
    </HeaderWrapper>
  );
}
