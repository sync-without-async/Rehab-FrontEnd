import { useState, useEffect } from "react";
import styled from "styled-components";
import Opatient from "../../assets/images/user/Opatient.png";
import { userLogin } from "../../librarys/dummy-api";

const Card = styled.div`
  width: 250px;
  border: 1px solid #e1e1e1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 20px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  background-color: #ffffff;
`;

const Title = styled.h1`
  font-size: 14px;
  margin-bottom: 15px;
`;

const Separator = styled.hr`
  width: 100%;
  height: 2px;
  background-color: #d9d9d9;
  margin-bottom: 15px;
  margin-top: 10px;
`;

const ImageContainer = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 20px;
  overflow: hidden;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
`;

const UserName = styled.span`
  font-size: 30px;
  font-weight: bold;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
`;

const UserTitle = styled.span`
  font-size: 16px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
`;

const Info = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 12px;
  margin-bottom: 10px;
  text-align: left;
`;

const Logout = styled.div`
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
  text-align: left;
`;

const UserCard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const data = await userLogin("HL0001", "123456");
      if (data) {
        setUserData(data);
      }
    }
    fetchUserData();
  }, []);

  if (!userData) return null;

  return (
    <Card>
      <Title>내 프로필</Title>
      <Separator />
      <ImageContainer>
        <Avatar src={Opatient} alt="avatar" />
      </ImageContainer>
      <UserName>{userData.name}</UserName>
      <UserTitle>님</UserTitle>
      <Separator />
      {userData.assignedDoctor && (
        <Info>👩‍💼 {userData.assignedDoctor} 전문의</Info>
      )}
      {userData.assignedTherapist && (
        <Info>👩‍💻 {userData.assignedTherapist} 재활치료사</Info>
      )}
      <Separator />
      <Logout>로그아웃</Logout>
    </Card>
  );
};

export default UserCard;
