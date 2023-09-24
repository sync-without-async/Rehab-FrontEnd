import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import UserComponent from './UserComponents';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #fff;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

const NavMenu = styled.div`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  cursor: pointer;
`;

export default function Header(props) {
  let navigate = useNavigate();

  const { userType, userName } = props; 

  const menus = {
    null: ["서비스 소개", "회원가입", "로그인"], 
    user: ["나의 수강 페이지", "실시간 비대면 진료", "로그아웃"],
    admin1: ["관리자 대시보드", "실시간 비대면 진료", "로그아웃"],
    admin2: ["운동 등록하기", "관리자 대시보드", "실시간 비대면 진료", "로그아웃"]
  };

  const handleClick = (item) => {
    switch(item) {
      case "서비스 소개":
        navigate("/intro");
        break;
      case "회원가입":
        navigate("/signup");
        break;
      case "로그인":
        navigate("/login");
        break;
      default:
        break;
    }
  };

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate('/')}>Re:Hab</Logo>
      <NavMenu>
        {menus[userType].map((item, index) => (
          <NavItem key={index} onClick={() => handleClick(item)}>
            {item}
          </NavItem>
        ))}
        {userType && <UserComponent userType={userType} userName={userName} />}
      </NavMenu>
    </HeaderContainer>
  );
}
