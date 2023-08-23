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
          description="이 코스는 목과 어깨의 근육을 이완시켜주는 운동을 포함하고 있습니다."
          time="총 10분"
          tags={["테스트1", "운동"]}
        />
        <CourseCard 
          image={null} 
          title="코어 강화 코스"
          description="코어 근육을 강화하는데 초점을 둔 운동을 학습합니다."
          time="총 20분"
          tags={["코어", "강화"]}
        />
        <CourseCard 
          image={null} 
          title="유연성 향상 코스"
          description="몸의 유연성을 높이는 스트레칭 운동을 포함하고 있습니다."
          time="총 15분"
          tags={["스트레칭", "유연성"]}
        />
        <CourseCard 
          image={null} 
          title="하체 강화 코스"
          description="다리와 엉덩이 근육을 강화하는 운동을 진행합니다."
          time="총 25분"
          tags={["하체", "강화"]}
        />
        <CourseCard 
          image={null} 
          title="유산소 운동 코스"
          description="심장 건강과 체력 향상을 위한 유산소 운동을 합니다."
          time="총 30분"
          tags={["유산소", "체력"]}
        />
        <CourseCard 
          image={null} 
          title="근력 운동 코스"
          description="체중을 이용한 근력 운동을 중점적으로 합니다."
          time="총 20분"
          tags={["근력", "체중운동"]}
        />
      </CourseWrapper>
    </div>
  );
};

export default MyCourse;