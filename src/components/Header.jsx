import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectName,
  selectIsLoggedIn,
  selectIsAdmin,
  logout,
} from "../redux/userSlice.js";
import { show } from "../redux/modalSlice.js";
import { clearToken } from "../librarys/login-api.js";

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  font-weight: bold;
  position: relative;
  margin-top: 20px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  left: 100px;
  top: 50%;
  transform: translateY(-50%);
`;

const Nav = styled.nav`
  display: flex;
  position: absolute;
  right: 70px;
  align-items: center;
`;

const MainLink = styled(Link)`
  text-decoration: none;
  color: black;
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
  const dispatch = useDispatch();

  const userName = useSelector(selectName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);
  const userType = useSelector(selectUserType);

  const handleLoginClick = () => {
    if (isLoggedIn) {
      if (confirm("로그아웃 하시겠습니끼?")) {
        clearToken();
        dispatch(logout());
      }
    } else {
      dispatch(show("login")); 
    }
  };

  return (
    <HeaderWrapper>
      <Logo>
        <MainLink to="/">Re:Hab</MainLink>
      </Logo>
      <Nav>
        {userType === 'user' && (
          <>
            <MainLink to="/mypage">나의 수강 페이지</MainLink>
            <MainLink to="/mycourse">실시간 비대면 진료</MainLink>
            <MainLink to="/about">서비스 소개</MainLink>
            <MainLink to="#" onClick={handleLoginClick}>로그아웃</MainLink>
            <ProfileImage src="path_to_user_image.jpg" />
          </>
        )}
        
        {userType === 'admin1' && (
          <>
            <MainLink to="/dashboard">관리자 대시보드</MainLink>
            <MainLink to="/mycourse">실시간 비대면 진료</MainLink>
            <MainLink to="/about">서비스 소개</MainLink>
            <MainLink to="#" onClick={handleLoginClick}>로그아웃</MainLink>
            <ProfileImage src="path_to_admin1_image.jpg" />
          </>
        )}

        {userType === 'admin2' && (
          <>
            <MainLink to="/register">운동 등록하기</MainLink>
            <MainLink to="/dashboard">관리자 대시보드</MainLink>
            <MainLink to="/mycourse">실시간 비대면 진료</MainLink>
            <MainLink to="/about">서비스 소개</MainLink>
            <MainLink to="#" onClick={handleLoginClick}>로그아웃</MainLink>
            <ProfileImage src="path_to_admin2_image.jpg" />
          </>
        )}

        {userType === 'guest' && (
          <>
            <MainLink to="/about">서비스 소개</MainLink>
            <MainLink to="#" onClick={handleLoginClick}>로그인</MainLink>
          </>
        )}
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
