import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import { userLogin } from '../../librarys/login-api';
import PropTypes from 'prop-types';

const LoginContainer = styled.div`
  width: 750px;
  height: 452px;
  border-radius: 7.5px;
  background-color: #ffffff;
  border: 1.5px solid #0064FF;
  position: relative;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 26.25px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 700;
  margin-left: 22.5px;
  margin-top: 18px;
`;

const Divider = styled.div`
  width: 675px;
  height: 0.75px;
  background-color: #D9D9D9;
  margin-top: 7.5px;
  margin-left: 22.5px;
  margin-right: auto;
`;

const Label = styled.label`
  font-size: 15px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  position: absolute;
`;

const Input = styled.input`
  width: 300px;
  height: 37.5px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  background-color: #FAFAFA;
  border: 0.75px solid #BBBBBB;
  position: absolute;
  margin-top: 0px;
  border-radius: 7.5px;
  padding-left: 7.5px; 
`;

const Button = styled.button`
  width: 210px;
  height: 45px;
  background-color: #3592FF;
  border-radius: 7.5px;
  color: white;
  font-size: 16.5px;
  border: none;
  cursor: pointer;
  position: absolute;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  margin-top: 15px;
`;

const SignupLink = styled.span`
  color: #7E7E7E;
  font-size: 13.5px;
  cursor: pointer;
  position: absolute;
  margin-left:-15px;
  margin-top: 7.5px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;


const LoginComponents = (props) => {
  let navigate = useNavigate();

  const [id, setId] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);  

  const handleLogin = async () => {
    const response = await userLogin(id, password);
    if (response) {
      console.log('로그인 성공:', response);
      navigate('/dashboard'); // 이거 아직 페이지 완성 안됨 임시 로그인 되나만 확인용입니다.
      props.onLoginSuccess(response);
    } else {
      setError('아이디나 비밀번호가 일치하지 않습니다.'); 
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Divider />

      <Label style={{ left: '240px', top: '135px' }}>아이디</Label>
      <Input 
        style={{ left: '240px', top: '170px' }}
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <Label style={{ left: '240px', top: '225px' }}>비밀번호</Label>
      <Input 
        style={{ left: '240px', top: '260px' }} 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: 'red', position: 'absolute', left: '300px', top: '367px' }}>{error}</p>}

      <Button 
        style={{ left: '280px', top: '310px' }}
        onClick={handleLogin}
      >
        로그인
      </Button>

      <SignupLink 
        style={{ left: '357px', top: '370px' }}
        onClick={() => navigate('/signup')} 
      >
        처음 오셨나요?
      </SignupLink>
    </LoginContainer>
  );
};

LoginComponents.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginComponents;