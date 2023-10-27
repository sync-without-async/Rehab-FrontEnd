import styled from "styled-components";
import { useState, useEffect } from "react";
import { userLogin } from "../../librarys/dummy-api";

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

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const Label = styled.span`
  color: #000000;
  font-size: 16px;
`;

const Value = styled.span`
  color: #908b8b;
`;

const DoctorDetailChart = () => {
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    async function fetchPatientInfo() {
      const doctorInfo = await userLogin("doctor", "123456");
      const patient = doctorInfo?.patient;

      if (patient) {
        setPatientInfo(patient);
      }
    }

    fetchPatientInfo();
  }, []);

  return (
    <Container>
      <Title>차트 정보</Title>
      <Divider />
      <Row>
        <Label>질병 분류 번호</Label>
        <Value>{patientInfo.diseaseCode}</Value>
      </Row>
      <Row>
        <Label>최근 외래 진료일</Label>
        <Value>{patientInfo.recentVisitDate}</Value>
      </Row>
      <Row>
        <Label>다음 진료 예약일</Label>
        <Value>{patientInfo.nextReservationDate}</Value>
      </Row>
      <Row>
        <Label>담당 재활 치료사</Label>
        <Value>{patientInfo.assignedTherapist}</Value>
      </Row>
    </Container>
  );
};

export default DoctorDetailChart;
