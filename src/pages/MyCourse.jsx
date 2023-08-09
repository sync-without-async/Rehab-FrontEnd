import profile from "../assets/images/profile.png";
import Header from "../components/Header";
import CourseCard from "../components/CourseCard"; 
import styled from 'styled-components';

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  margin-top: 40px;
  margin-left: 180px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const UserName = styled.h2`
  font-size: 24px;
`;

const WelcomeMessage = styled.p`
  font-size: 18px;
  margin: 5px 0;
`;

const CourseWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin: 40px auto; 
  max-width: 940px;
`;

const MyCourseTitle = styled.div`
font-size: 50px;
font-weight: bold;
margin-left: 200px;
`

const MyCourse = () => {
  const userName = "소현";

  return (
    <div>
      <Header />
      <ProfileSection>
        <ProfileImage src={profile} alt="프로필 이미지" />
        <div>
          <UserName>{userName} 님</UserName>
          <WelcomeMessage>환영합니다.</WelcomeMessage>
        </div>
      </ProfileSection>
      <MyCourseTitle>나의 코스</MyCourseTitle>
      <CourseWrapper>
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
        <CourseCard 
          image={null} 
          title="거북목 탈출코스"
          time="총 01시간 21분"
        />
      </CourseWrapper>
    </div>
  );
};

export default MyCourse;