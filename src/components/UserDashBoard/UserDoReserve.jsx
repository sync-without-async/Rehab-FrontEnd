import styled from "styled-components";
import UserSelectCard from "./UserSelectCard";

const Container = styled.div`
  width: 800px;
  height: 885px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
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

  return (
    <Container>
      <Title>비대면 진료 예약</Title>
      <Divider />
      <Info>진료를 희망하는 의료진을 선택해주세요.</Info>
      <UserSelectCard/>
    </Container>
  );
};

export default UserDoReserve;