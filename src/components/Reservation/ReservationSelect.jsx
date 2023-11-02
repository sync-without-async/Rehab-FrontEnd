import { useState, useEffect } from "react";
import styled from "styled-components";
import { UserSelectCard } from "../UserDashBoard/UserSelectCard";
import { userLogin } from "../../librarys/dummy-api";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 30px;
`;

const Text = styled.p`
  margin-top: 16px;
  font-size: 16px;
  font-weight: 400;
`;

const UserDoReserve = () => {
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const fetchLoginData = async () => {
      const data = await userLogin("HL0001", "123456");
      setLoginData(data);
    };
    fetchLoginData();
  }, []);

  if (!loginData) return null;

  return (
    <BlockContainer>
      <TitleText text="운동 등록" />
      <Text>진료를 희망하는 의료진을 선택해주세요.</Text>
      <CardWrapper>
        <UserSelectCard userType="admin1" userData={loginData.doctor} />
        <UserSelectCard userType="admin2" userData={loginData.therapist} />
      </CardWrapper>
    </BlockContainer>
  );
};

export default UserDoReserve;
