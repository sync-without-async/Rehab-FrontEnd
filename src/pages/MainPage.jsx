import Header from "../components/Header";
import styled from 'styled-components';
import dumbbell from "../assets/images/dumbbell.png";

const Background = styled.div`
  width: 100%;
  height: 250px;
  background-color: #14F2C6;
  position: relative;
  margin-top: 20px;
`;

const DumbbellImage = styled.img`
  position: absolute; 
  bottom: 80px;
  left: 118px;
`;

const ProgramText = styled.p`
  position: absolute;
  font-size: 50px;
  bottom: 20px; 
  left: 118px;
`;

const MainPage = () => {
  return (
    <div>
      <Header />
      <Background>
        <DumbbellImage src={dumbbell} alt="Dumbbell" />
        <ProgramText>프로그램</ProgramText>
      </Background>
    </div>
  );
};

export default MainPage;
