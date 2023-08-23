import { useState } from 'react'; 
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

const Label = styled.span`
  display: inline-block;
  width: 110px; 
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

const CategoryText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 400px;
  margin-top: 20px;
`;

const FilterButton = styled.button`
  width: 130px;
  height: 40px;
  border-radius: 10px;
  border: ${props => props.selected ? 'none' : '1px solid black'};  
  background-color: ${props => props.selected ? '#ACEAFF' : 'white'};
  color: ${props => props.selected ? 'black' : 'black'}; 
  margin-left: 10px;  
  transition: 0.3s;

  &:first-child {
    margin-left: 0;  
  }

  &:focus {
    outline: none;
  }
`;

const MainPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPosture, setSelectedPosture] = useState(null);

  return (
    <div>
      <Header />
      <Background>
        <DumbbellImage src={dumbbell} alt="Dumbbell" />
        <ProgramText>프로그램</ProgramText>
      </Background>
      <CategoryText>
        <Label>카테고리별</Label>
        {['팔', '어깨', '목', '허벅지'].map(category => (
          <FilterButton
            key={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)} 
          >
            {category}
          </FilterButton>
        ))}
      </CategoryText>
      <CategoryText>
        <Label>자세</Label>
        {['선 자세', '앉은 자세', '누운 자세'].map(posture => (
          <FilterButton
            key={posture}
            selected={selectedPosture === posture}
            onClick={() => setSelectedPosture(posture)} 
          >
            {posture}
          </FilterButton>
        ))}
      </CategoryText>
    </div>
  );
};

export default MainPage;





