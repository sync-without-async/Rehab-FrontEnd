import styled from "styled-components";
import TheraReserve from "./TheraReserve";

const Container = styled.div`
  width: 800px;
  height: 555px;
  margin: 0 auto; 
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 0px 80px;
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
  margin-bottom: 20px;
`;

const TheraUntactList = () => {
  return (
    <Container>
      <Title>비대면 진료 예약 목록</Title>
      <Divider />
      <TheraReserve/>
      <TheraReserve/>
      <TheraReserve/>
      <TheraReserve/>
      <TheraReserve/>
      <TheraReserve/>
    </Container>
  );
};

export default TheraUntactList;
