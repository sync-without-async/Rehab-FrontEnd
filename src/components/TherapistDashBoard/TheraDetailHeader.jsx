import styled from "styled-components";
import { useEffect, useState } from "react";
import { userLogin } from "../../librarys/dummy-api";

const Container = styled.div`
  width: 800px;
  height: 60px;
  border-radius: 10px;
  border: 1px solid #0064ff;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
`;

const UserName = styled.span`
  font-size: 25px;
  color: #000000;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 500;
  margin-left: -10px;
`;

const Gender = styled.span`
  font-size: 16px;
  color: #908b8b;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 300;
  margin-left: -450px;
`;

const Birth = styled.span`
  font-size: 16px;
  color: #908b8b;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 300;
  margin-left: 10px;
`;

const getCurrentAge = (birthDateStr) => {
  const today = new Date();
  const birthDate = new Date(birthDateStr);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const TheraDetailHeader = () => {
  const [patientInfo, setPatientInfo] = useState({});

  useEffect(() => {
    async function fetchPatientInfo() {
      const theraInfo = await userLogin("therapist", "123456");
      const patient = theraInfo?.patient;

      if (patient) {
        setPatientInfo({
          name: patient.name,
          gender: patient.gender,
          birth: patient.birth,
        });
      }
    }

    fetchPatientInfo();
  }, []);

  return (
    <Container>
      <UserName>{patientInfo.name}</UserName>
      <Gender>{patientInfo.gender}</Gender>
      <Birth>
        {patientInfo.birth
          ? `${patientInfo.birth.split("-").join(".")} (만 ${getCurrentAge(
              patientInfo.birth,
            )}세)`
          : ""}
      </Birth>
    </Container>
  );
};

export default TheraDetailHeader;
