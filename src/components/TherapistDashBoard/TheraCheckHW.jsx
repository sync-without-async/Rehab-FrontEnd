import styled from "styled-components";
import CircularChart from "../DoctorDashBoard/CircleChart";
import { getUserExercises } from "../../librarys/dummy-api";

const Container = styled.div`
  width: 380px;
  height: 200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  position: relative;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #333;
  display: inline-block;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-top: 0px;
`;

const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 20px;
`;

const ExerciseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  & > span:first-child {
    font-size: 16px;
    color: #000000;
    margin-right: 60px;
  }

  & > span {
    font-size: 16px;
    color: #000000;
  }

  & > span:last-child {
    color: #d9d9d9;
  }
`;

const ButtonGroup = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  width: 140px;
  height: 30px;
  background-color: #3592ff;
  color: #fefdfd;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  &:first-child {
    margin-left: 0;
  }
`;

const TheraCheckHW = () => {
  const userId = "HL0001";

  const exercises = getUserExercises(userId);
  console.log("Exercises for:", userId, exercises);
  const totalExercises = exercises.length;
  const passedExercises = exercises.filter(
    (exercise) => exercise.judgement === "합격",
  ).length;
  const failedExercises = totalExercises - passedExercises;

  return (
    <Container>
      <Title>과제 수행도</Title>
      <ButtonGroup>
        <Button>과제 할당</Button>
      </ButtonGroup>
      <Divider />
      <div style={{ display: "flex" }}>
        <CircularChart
          totalExercises={totalExercises}
          passedExercises={passedExercises}
        />
        <ExerciseInfo>
          <ExerciseItem>
            <span>총 과제</span>
            <span>{`${totalExercises}개`}</span>
          </ExerciseItem>
          <ExerciseItem>
            <span>합격한 과제</span>
            <span>{`${passedExercises}개`}</span>
          </ExerciseItem>
          <ExerciseItem>
            <span>불합격한 과제</span>
            <span>{`${failedExercises}개`}</span>
          </ExerciseItem>
        </ExerciseInfo>
      </div>
    </Container>
  );
};

export default TheraCheckHW;
