import { useState, useEffect } from "react";
import styled from "styled-components";
import { UserSelectCard } from'./UserSelectCard';
import { userLogin } from "../../librarys/login-api";

const Container = styled.div`
  width: 800px;
  height: 600px;
  margin: 0 auto; 
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
`;

const CardWrapper = styled.div`
  display: flex;      
  justify-content: center;  
  margin-top: 20px;
  gap: 30px;  
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  display: inline-block;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const Info = styled.p`
  margin-top: 20px;
  font-size: 18px;
  font-weight: 300;
  color: #000000;
`

const UserDoReserve = () => {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const fetchLoginData = async () => {
      const data = await userLogin('HL0001', '123456');
      setLoginData(data);
    };
    fetchLoginData();
  }, []); 

  if (!loginData) return null;

  return (
    <Container>
      <Title>비대면 진료 예약</Title>
      <Divider />
      <Info>진료를 희망하는 의료진을 선택해주세요.</Info>
      <CardWrapper>
        <UserSelectCard userType="admin1" userData={loginData.doctor} />
        <UserSelectCard userType="admin2" userData={loginData.therapist} />
      </CardWrapper>
    </Container>
  );
};

export default UserDoReserve;