import styled from "styled-components";
import TheraVideoUploader from "./TheraVideoUploader";
import InputText from "../Input/InputText";
import InputDText from "../Input/InputDText";
import FilterButton from "../Button/FilterButton";

const Container = styled.div`
  width: 800px;
  height: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top: 10px;
  padding: 20px 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 20px;
`;

const TitleA = styled.p`
  font-size: 16px;
  margin-bottom:10px;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  margin-top:20px;
`;

const Button = styled.button`
  width: 210px;
  height: 40px;
  background-color: #3592FF;
  font-weight: 300;
  color: #FEFDFD;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top:20px;
  display: block;     
  margin-left: auto;
  margin-right: auto; 
`;

const TheraExerciseAdd = () => {
  return (
    <Container>
      <Title>운동 등록</Title>
      <Divider />
      <TitleA>가이드 영상 업로드*</TitleA>
      <TheraVideoUploader />
      <FlexContainer>
        <InputText label="운동 제목 *" />
        <FilterButton label="운동 태그 *" />
      </FlexContainer>
      <InputDText label="운동 설명 *"/>
      <Button>기록 추가</Button>
    </Container>
  );
};

export default TheraExerciseAdd;
