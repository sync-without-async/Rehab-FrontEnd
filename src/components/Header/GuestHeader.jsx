import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff; 
  padding: 0 20px; 
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); 
`;

const Logo = styled.h1`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 700;
  font-size: 24px;
  color: #000000; 
  cursor: pointer;
`;

const NavMenu = styled.nav`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  display: flex;
  gap: 30px; 
  margin-right: 30px;
`;

const NavItem = styled.a`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  cursor: pointer;
  text-decoration: none;
  padding: 5px 10px; 
  border-radius: 10px; 

  &:hover {
    color: #000;
    background-color: #D9D9D9; 
  }
`;

const GuestHeader = () => {
  return (
    <HeaderContainer>
      <Logo>Re:Hab</Logo>
      <NavMenu>
        <NavItem href="/main">서비스 소개</NavItem>
        <NavItem href="/signup">회원가입</NavItem>
        <NavItem href="/login">로그인</NavItem>
      </NavMenu>
    </HeaderContainer>
  );
};

export default GuestHeader;

