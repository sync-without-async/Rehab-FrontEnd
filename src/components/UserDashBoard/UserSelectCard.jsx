import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icondoctor from "../../assets/icons/icondoctor.png";
import Iconmajor from "../../assets/icons/iconmajor.png";
import Iconhospital from "../../assets/icons/iconhospital.png";
import DoctorImage from "../../assets/images/user/Odoctor.png";
import TherapistImage from "../../assets/images/user/Otherapist.png";

const Card = styled.div`
    width: 280px;
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
  background-color: #3592FF;
  color: #FEFDFD;
  cursor: pointer;
  border: none;
  align-self: center;
  font-size: 12px;
`;

const Icon = styled.img`
  height: 12px;
  width: 12px;
  margin-right: 5px;
  vertical-align: middle;
`;

const MidSection = styled.div`
    background-color: rgba(0, 100, 255, 0.03); 
`;


export const UserSelectCard = ({ userType, userData }) => {
  if (!userData) return null;

  const imageUrl = userType === "admin1" ? DoctorImage : TherapistImage;
  const title = userType === "admin1" ? "담당 전문의 프로필" : "담당 재활치료사 프로필";

  return (
    <Card>
      <Title>{title}</Title>
      <Separator />
      <MidSection>
        <ImageContainer>
          <Avatar src={imageUrl} alt="avatar" />
        </ImageContainer>
        <UserName>{userData.name}</UserName>
      </MidSection>
      <Separator />
      <Info><Icon src={Icondoctor} alt="icon" /> {userType === "admin1" ? "전문의" : "재활치료사"}</Info>
      <Info><Icon src={Iconhospital} alt="icon" /> {userData.workplace}</Info>
      <Info><Icon src={Iconmajor} alt="icon" /> {userData.major}</Info>
      <Separator />
      <Button>진료 예약</Button>
    </Card>
  );
}

UserSelectCard.propTypes = {
  userType: PropTypes.string.isRequired,
  userData: PropTypes.shape({
    name: PropTypes.string,
    workplace: PropTypes.string,
    major: PropTypes.string,
  }).isRequired,
};

export default UserSelectCard;