import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  font-family: "Inter var", sans-serif;
  font-weight: bold;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const CenterNav = styled(Nav)`
  flex-grow: 1;
  justify-content: center;
`;

const MainLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Logo>
        <MainLink to="/">Logo</MainLink>
      </Logo>
      <CenterNav>
        <MainLink to="/">메인 페이지</MainLink>
        <MainLink to="/my-course">나의 코스</MainLink>
      </CenterNav>
      <Nav>
        <MainLink to="/login">로그인</MainLink>
        <MainLink to="/signup">회원가입</MainLink>
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
