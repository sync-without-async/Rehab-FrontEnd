import styled from "styled-components";
import { getUntactRecords } from "../../librarys/login-api";

const Container = styled.div`
  width: 800px;
  height: 471px;
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

const DoctorInfo = styled.span`
  font-size: 18px;
  position: absolute; 
  margin-top: 15px; 
  right: 20px;
`;


const TheraUntactRecord = () => {
  const userId = "HL0001"; 
  const records = getUntactRecords(userId);

  return (
    <Container>
      <Title>비대면 진료 기록</Title>
      <Divider />
      {records && records.map(record => (
        <>
          <DateText>{record.date}</DateText>
          <DoctorInfo>{record.doctorName}</DoctorInfo>
          <RecordBox>
            {record.record}
          </RecordBox>
        </>
      ))}
    </Container>
  );
};

export default TheraUntactRecord;