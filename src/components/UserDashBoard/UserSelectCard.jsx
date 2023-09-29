import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Icondoctor from "../../assets/icons/icondoctor.png";
import Iconmajor from "../../assets/icons/iconmajor.png";
import Iconhospital from "../../assets/icons/iconhospital.png";
import DoctorImage from "../../assets/images/user/Odoctor.png";
import TherapistImage from "../../assets/images/user/Otherapist.png";
import {userLogin} from "../../librarys/login-api";

const Card = styled.div`
    width: 250px;
    border: 1px solid #e1e1e1;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    text-align: center;
    margin: 20px;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    background-color: #ffffff;
`;

const Title = styled.h1`
    font-size: 14px;
    margin-bottom: 15px;
`;

const Separator = styled.hr`
    width: 100%;
    height: 2px;
    background-color: #D9D9D9;
    margin-bottom: 15px;
    margin-top:10px;
`;

const ImageContainer = styled.div`
    width: 96px;
    height: 96px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
    overflow: hidden;
`;

const Avatar = styled.img`
    width: 100%;
    height: 100%;
`;

const UserName = styled.span`
    font-size: 30px;
    font-weight: bold;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const UserTitle = styled.span`
    font-size: 16px;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const Info = styled.div`
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    font-size: 12px;
    margin-bottom: 10px;
    text-align: left; 
`;

const Button = styled.button`
    width: 150px;
    height: 24px;
    border-radius: 10px;
    background-color: #000;
    color: #fff;
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    cursor: pointer;
    border: none;
    align-self: center;
    margin-top: 15px;
`;

const Icon = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 8px;
    vertical-align: middle;
`;

const UserSelectCard = () => {
  const [userData, setUserData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
  const [therapistData, setTherapistData] = useState(null);

  useEffect(() => {
      async function fetchUserData() {
          const data = await userLogin('HL0001', '123456'); 
          if (data) {
              setUserData(data);

              
              const doctorDetails = await userLogin('doctor', '123456');
              setDoctorData(doctorDetails);

              
              const therapistDetails = await userLogin('therapist', '123456');
              setTherapistData(therapistDetails);
          }
      }
      fetchUserData();
  }, []);

  if (!userData) return null;

  return (
      <Card>
          <Title>{userData.assignedDoctor ? "담당 전문의 프로필" : "담당 재활치료사 프로필"}</Title>
          <Separator />
          <ImageContainer>
              <Avatar src={userData.assignedDoctor ? DoctorImage : TherapistImage} alt="avatar" />
          </ImageContainer>
          <UserName>{userData.name}</UserName><UserTitle>님</UserTitle>
          <Separator />
          <Info>
              <Icon src={Icondoctor} alt="role-icon" />
              {userData.assignedDoctor ? "전문의" : "재활치료사"}
          </Info>
          <Info>
              <Icon src={Iconhospital} alt="workplace-icon" />
              {userData.assignedDoctor ? doctorData.workplace : therapistData.workplace}
          </Info>
          <Info>
              <Icon src={Iconmajor} alt="major-icon" />
              {userData.assignedDoctor ? doctorData.major : therapistData.major}
          </Info>
          <Separator />
          <Button>진료 예약</Button>
      </Card>
  );
}

export default UserSelectCard;