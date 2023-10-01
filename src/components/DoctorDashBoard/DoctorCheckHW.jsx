import styled from "styled-components";
import CircularChart from "./CircleChart";

const Container = styled.div`
  width: 380px;
  height: 200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
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
  margin-top: 0px;
`;


const DoctorCheckHW = () => {
  
  return (
    <Container>
      <Title>과제 수행도</Title>
      <Divider />
      <CircularChart totalExercises={100} passedExercises={72} />
    </Container>
  );
};

export default DoctorCheckHW;
