import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import styled from "styled-components";
import { getChartByPatient } from "../../librarys/api/chart";
import { selectToken } from '../../redux/userSlice';


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

const DoctorDetailHeader = () => {
  const [patientInfo, setPatientInfo] = useState({});
  const { patientMid } = useParams();
  const accessToken = useSelector(selectToken);

  useEffect(() => {
    async function fetchPatientChart() {
      try {
        const chartDetail = await getChartByPatient(accessToken, patientMid);
        if (chartDetail) {
          setPatientInfo({
            name: chartDetail.patient_name,
            gender: chartDetail.sex,
            birth: chartDetail.birth,
          });
        }
      } catch (error) {
        console.error("환자 차트 정보를 불러오는데 실패하였습니다.", error);
      }
    }

    fetchPatientChart();
  }, [patientMid, accessToken]);

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

export default DoctorDetailHeader;
