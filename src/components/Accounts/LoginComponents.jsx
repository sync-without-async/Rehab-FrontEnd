import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react';
import { userLogin } from '../../librarys/login-api';

const LoginContainer = styled.div`
  width: 1000px;
  height: 603px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 2px solid #0064FF;
  position: relative;
  box-shadow: 0px 12px 24px rgba(0, 0, 0, 0.1);
`;


const Title = styled.h1`
  font-size: 35px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 700;
  margin-left: 30px;
  margin-top: 24px;
`;

const Divider = styled.div`
  width: 900px;
  height: 1px;
  background-color: #D9D9D9;
  margin-top: 10px;
  margin-left: 30px;
  margin-right: auto;
`;

const Label = styled.label`
  font-size: 20px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-weight: 500;
  position: absolute;
`;

const Input = styled.input`
  width: 400px;
  height: 50px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  background-color: #FAFAFA;
  border: 1px solid #BBBBBB;
  position: absolute;
  margin-top: 0px;
  border-radius: 10px;
  padding-left: 10px; 

`;

const Button = styled.button`
  width: 280px;
  height: 60px;
  background-color: #3592FF;
  border-radius: 10px;
  color: white;
  font-size: 22px;
  border: none;
  cursor: pointer;
  position: absolute;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  margin-top: 20px;
`;

const SignupLink = styled.span`
  color: #7E7E7E;
  font-size: 18px;
  cursor: pointer;
  position: absolute;
  margin-left:-20px;
  margin-top: 10px;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const LoginComponents = () => {
  let navigate = useNavigate();

  const [id, setId] = useState('');  
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null);  
  const handleLogin = async () => {
    const response = await userLogin(id, password);
    if (response) {
      console.log('로그인 성공:', response);
      navigate('/dashboard'); // 이거 아직 페이지 완성 안됨 임시 로그인 되나만 확인용입니다.
    } else {
      setError('아이디나 비밀번호가 일치하지 않습니다.'); 
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      <Divider />

      <Label style={{ left: '300px', top: '187px' }}>아이디</Label>
      <Input 
        style={{ left: '300px', top: '227px' }}
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <Label style={{ left: '300px', top: '287px' }}>비밀번호</Label>
      <Input 
        style={{ left: '300px', top: '327px' }} 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p style={{ color: 'red', position: 'absolute', left: '300px', top: '367px' }}>{error}</p>}

      <Button 
        style={{ left: '360px', top: '397px' }}
        onClick={handleLogin}
      >
        로그인
      </Button>

      <SignupLink 
        style={{ left: '460px', top: '477px' }}
        onClick={() => navigate('/signup')} 
      >
        처음 오셨나요?
      </SignupLink>
    </LoginContainer>
  );
};

export default LoginComponents;
