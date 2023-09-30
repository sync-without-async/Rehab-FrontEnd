import styled from "styled-components";
import InputText from "../Input/InputText";
import Dropdown from "../Dropdown/Dropdown";
import DateSelect from "../Input/DateSelect";
import InputTextLong from "../Input/InputTextLong";

const ChartContainer = styled.div`
  width: 800px;
  height: 900px;
  border-radius: 7.5px;
  background-color: #ffffff;
  border: 1.5px solid #0064ff;
  position: relative;
  box-shadow: 0px 9px 18px rgba(0, 0, 0, 0.1);
`;

const Divider = styled.div`
  width: 675px;
  height: 0.75px;
  background-color: #d9d9d9;
  margin-top: 7.5px;
  margin-left: 22.5px;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 27px;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  font-weight: 700;
  margin-left: 23px;
  margin-top: 18px;
`;

const InputFieldsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 23px;
  margin-left: 97px;
  gap: 15px;
  width: 525px;
`;

const Button = styled.button`
  width: 210px;
  height: 45px;
  background-color: #3592ff;
  border-radius: 7.5px;
  color: white;
  font-size: 16.5px;
  border: none;
  cursor: pointer;
  position: absolute;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top: 30px;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
`;

const DoctorChart = () => {

  const gender = ["남성", "여성"];
  
  const therapist = ["오민혁" , "오민혁", "오민혁"];

  return (
    <ChartContainer>
      <Title>환자 차트 작성</Title>
      <Divider />
      <InputFieldsContainer>
        <InputText label="질병 분류 번호 *" />
        <Dropdown label="성별 *" items={gender} />
      </InputFieldsContainer>
      <InputFieldsContainer>
        <InputText label="환자 성함 *" />
        <DateSelect labelText="환자 생년월일 *" />
      </InputFieldsContainer>
      <InputFieldsContainer>
        <InputText label="환자 전화번호*" />
        <Dropdown label="담당 치료사 *" items={therapist} />
      </InputFieldsContainer>
      <InputFieldsContainer>
        <DateSelect labelText="다음 외래 일정 *" />
      </InputFieldsContainer>
      <InputFieldsContainer>
      <InputTextLong label="진료 기록 작성*" />
      </InputFieldsContainer>
      <InputFieldsContainer>
      <InputTextLong label="재활치료사 재활 운동 요청서 작성*" />
      </InputFieldsContainer>
      <Button>작성하기</Button>
      </ChartContainer>
  );
};

export default DoctorChart;
