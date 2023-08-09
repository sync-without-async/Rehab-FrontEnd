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
`;

const CenterNav = styled(Nav)`
  flex-grow: 1;
  justify-content: center;
  gap: 40px; 
`;

const RightNav = styled(Nav)`
  gap: 10px;
`;

const Divider = styled.div`
  height: 25px;
  width: 1px;
  background-color: black;
`;

const MainLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:hover,
  &:active,
  &:focus {
    text-decoration: none; 
    outline: none;
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
      <RightNav>
        <MainLink to="/login">로그인</MainLink>
        <Divider /> 
        <MainLink to="/signup">회원가입</MainLink>
      </RightNav>
    </HeaderWrapper>
  );
};

export default Header;
