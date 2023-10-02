import styled from "styled-components";

const Container = styled.div`
  width: 800px;
  height: 287px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
  margin-bottom:20px;
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
`;

const DateText = styled.p`
  font-size: 24px;
  font-weight: bold;
  margin-top:10px;
  margin-bottom: 15px;
  display: inline-block;
`;

const RecordBox = styled.div`
  width: 100%;
  height: 122px;
  background-color: #FAFAFA;
  border-radius: 10px;
  border: 1px solid #BBBBBB;
  padding: 10px;
  font-size: 16px;
  word-wrap: break-word; 
  overflow: hidden;
`;

const TherafromDoctor = () => {

  return (
    <Container>
      <Title>재활 운동 요청서</Title>
      <Divider />
          <DateText>2023.08.31</DateText>
          <RecordBox>
          </RecordBox>
    </Container>
  );
};

export default TherafromDoctor;