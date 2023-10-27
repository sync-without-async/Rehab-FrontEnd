import styled from 'styled-components';
import doctorImage from "../../assets/images/user/doctor.png";
import userImage from "../../assets/images/user/user.png";
import therapistImage from "../../assets/images/user/therapist.png";

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserInfo = styled.div`
  text-align: right;
`;

const JobTitle = styled.p`
  font-weight: bold;
  margin: 0;
`;

const UserName = styled.p`
  margin: 0;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 8px;
`;

const UserComponent = ({ userType, userName }) => {
  let jobTitle, userImg;

  switch (userType) {
    case 'user':
      jobTitle = "재활의학과 환자"; //임시 구현
      userImg = userImage;
      break;
    case 'admin1':
      jobTitle = "재활의학과 전문의"; //임시 구현
      userImg = doctorImage;
      break;
    case 'admin2':
      jobTitle = "재활치료사"; //임시 구현
      userImg = therapistImage;
      break;
    default:
      return null;
  }

  return (
    <UserContainer>
      <UserInfo>
        <JobTitle>{jobTitle}</JobTitle>
        <UserName>{userName}님</UserName>
      </UserInfo>
      <UserImage src={userImg} alt={jobTitle} />
    </UserContainer>
  );
};

export default UserComponent;
