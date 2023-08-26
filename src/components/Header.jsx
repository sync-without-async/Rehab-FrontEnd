import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DispatchContext } from  '../librarys/context.jsx';
import { useContext } from 'react';
import Modal from './Modal.jsx';

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-family: "SUIT Variable";
  font-weight: bold;
  position: relative; 
  margin-top:20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  position: absolute; 
  left: 100px; 
  top: 50%;
  transform: translateY(-50%);
  font-family: "SUIT Variable";
`;

const Nav = styled.nav`
  display: flex;
  position: absolute;
  right: 70px; 
  align-items: center;
  font-family: "SUIT Variable";
`;

const MainLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-family: "SUIT Variable";
  &:hover,
  &:active,
  &:focus {
    text-decoration: none; 
    outline: none;
  }
`;

const Divider = styled.div`
  height: 30px;
  width: 1px;
  background-color: black;
  margin-left: 20px;
  margin-right: 30px;
`;

const Header = () => {
  const dispatch = useContext(DispatchContext);

  const handleLoginClick = () => {
    dispatch({ type: 'show', payload: 'loginModal' });
  };

  return (
    <HeaderWrapper>
      <Logo>
        <MainLink to="/">Re:Hab</MainLink>
      </Logo>
      <Nav>
        <MainLink to="/register" style={{ marginRight: '50px' }}>운동등록</MainLink>
        <MainLink to="/" style={{ marginRight: '40px' }}>메인 페이지</MainLink>
        <MainLink to="/mycourse" style={{ marginRight: '20px' }}>수강내역</MainLink>
        <Divider />
        <MainLink to="#" onClick={handleLoginClick}>로그인</MainLink>
      </Nav>
      <Modal id="loginModal">

      </Modal>
    </HeaderWrapper>
  );
};

export default Header;
