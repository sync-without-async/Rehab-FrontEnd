import { useState, useEffect } from 'react';
import styled from 'styled-components';
import TheraImage from '../../assets/images/user/Otherapist.png';
import {userLogin} from "../../librarys/login-api";
import IconDoctor from '../../assets/icons/icondoctor.png';
import IconHospital from '../../assets/icons/iconhospital.png';

const Container = styled.div`
    width: 800px;
    height: 150px;
    border-radius: 10px;
    border: 1px solid #0064FF;
    background-color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px 32px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

const Greeting = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const UserName = styled.span`
    font-size: 25px;
    color: #0064FF;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-weight: 700;
`;

const GreetingText = styled.span`
    font-size: 16px;
    color: #000000;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-weight: 500;
`;

const Avatar = styled.img`
    width: 120px;
    height: 120px;
    border-radius: 50%;
`;

const Icon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 5px;
`;

const InfoText = styled.span`
  font-size: 14px;
  font-weight: 300;
  margin-left: 10px;
`;

const AppointmentInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const DoctorDashHeader = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const data = await userLogin('therapist', '123456'); 
      if (data) {
        setUserData(data);
      }
    }
    fetchUserData();
  }, []);

  if (!userData) return null;

  return (
    <Container>
      <TextContainer>
        <Greeting>
          <UserName>{userData.name}</UserName>
          <GreetingText>님, 안녕하세요.</GreetingText>
        </Greeting>
        <AppointmentInfo>
          <Icon src={IconDoctor} alt="Doctor" />
          <InfoText>{userData.major}</InfoText>
        </AppointmentInfo>
        <AppointmentInfo>
          <Icon src={IconHospital} alt="Hospital" />
          <InfoText>{userData.workplace}</InfoText>
        </AppointmentInfo>
      </TextContainer>
      <Avatar src={TheraImage} alt="User Avatar" />
    </Container>
  );
}
export default DoctorDashHeader;
