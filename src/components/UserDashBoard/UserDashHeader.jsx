import { useState, useEffect } from "react";
import styled from "styled-components";
import UserImage from "../../assets/images/user/Opatient.png";
import { userLogin } from "../../librarys/dummy-api";

const Container = styled.div`
  width: 800px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #0064ff;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Greeting = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const UserName = styled.span`
  font-size: 25px;
  color: #0064ff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
`;

const GreetingText = styled.span`
  font-size: 16px;
  color: #000000;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 500;
`;

const Message = styled.p`
  font-size: 16px;
  color: #000000;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 500;
  margin-bottom: 20px;
`;

const DateInfo = styled.div`
  font-size: 16px;
  color: #000000;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 500;
`;

const DateLabel = styled.span`
  font-weight: bold;
`;

const DateWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const UserDashHeader = () => {
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

  if (!userData) return null; // 로그인 데이터가 아직 없는 경우를 처리

  return (
    <Container>
      <TextContainer>
        <Greeting>
          <UserName>{userData.name}</UserName>
          <GreetingText>님, 안녕하세요.</GreetingText>
        </Greeting>
        <Message>
          {userData.name}님께 할당된 재활 운동들을 확인해보세요!
        </Message>
        <DateWrapper>
          <DateInfo>
            <DateLabel>최근 외래 진료일: </DateLabel>
            {userData.recentVisitDate}
          </DateInfo>
          <DateInfo>
            <DateLabel>다음 외래 예약일: </DateLabel>
            {userData.nextReservationDate}
          </DateInfo>
        </DateWrapper>
      </TextContainer>
      <Avatar src={UserImage} alt="User Avatar" />
    </Container>
  );
};
export default UserDashHeader;
