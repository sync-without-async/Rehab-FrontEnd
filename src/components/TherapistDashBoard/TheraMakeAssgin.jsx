import styled from "styled-components";


const Container = styled.div`
  width: 800px;
  height: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top:10px;
  padding: 20px 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 15px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 20px;
`;

const TheraMakeAssign = () => {

  return (
    <Container>
      <Title>과제 할당</Title>
      <Divider />
    </Container>
  );
};

export default TheraMakeAssign;
