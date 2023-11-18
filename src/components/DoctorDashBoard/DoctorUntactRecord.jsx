import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { getAIRecordDetails } from "../../librarys/api/chart";
import { selectToken } from "../../redux/userSlice";

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
  margin-top: 10px;
  margin-bottom: 15px;
  display: inline-block;
`;

const RecordBox = styled.div`
  width: 100%;
  height: 122px;
  background-color: #fafafa;
  border-radius: 10px;
  border: 1px solid #bbbbbb;
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

const DoctorUntactRecord = () => {
  const [records, setRecords] = useState([]);
  const { patientMid } = useParams();
  const accessToken = useSelector(selectToken);

  useEffect(() => {
    async function fetchAIRecords() {
      try {
        const aiRecords = await getAIRecordDetails(accessToken, patientMid);
        setRecords(aiRecords);
      } catch (error) {
        console.error("비대면 진료 기록을 불러오는데 실패하였습니다.", error);
      }
    }

    fetchAIRecords();
  }, [patientMid, accessToken]);

  return (
    <Container>
      <Title>비대면 진료 기록</Title>
      <Divider />
      {records.map((record, index) => (
        <React.Fragment key={index}>
          <DateText>{record.regDate}</DateText>
          <DoctorInfo>{record.staff_id}</DoctorInfo>
          <RecordBox>{record.summary}</RecordBox>
        </React.Fragment>
      ))}
    </Container>
  );
};

export default DoctorUntactRecord;
