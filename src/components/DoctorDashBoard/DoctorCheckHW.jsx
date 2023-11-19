import styled from "styled-components";
import CircularChart from "./CircleChart";
import { getUserExercises } from "../../librarys/dummy-api";
import { useContext } from "react";
import { ReducerContext } from "../../reducer/context.js";
import { METRICS_PASS, ROLE_TYPE } from "../../librarys/type.js";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/userSlice.js";

const Container = styled(BlockContainer)`
  width: 380px;
  padding: 8px 24px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

const Wrapper = styled.div`
  margin-top: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExerciseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ExerciseItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  font-size: 16px;
  gap: 80px;

  & > span:last-child {
    color: #908b8b;
  }
`;

const DoctorCheckHW = () => {
  const role = useSelector(selectRole);
  const [state, dispatch] = useContext(ReducerContext);
  const { account_id, metrics } = state;

  const totalItems = metrics.length;
  const passedItems = metrics.filter((item) => item >= METRICS_PASS).length;
  const failedItems = totalItems - passedItems;

  const buttons =
    role === ROLE_TYPE.THERAPIST
      ? [
          {
            text: "과제 할당",
            to: `/chart/${account_id}/assign`,
          },
        ]
      : [];

  return (
    <Container>
      <TitleText text="과제 수행도" small buttons={buttons} />
      <Wrapper>
        <CircularChart
          totalExercises={totalItems}
          passedExercises={passedItems}
        />
        <ExerciseInfo>
          <ExerciseItem>
            <span>전체 과제</span>
            <span>{totalItems}개</span>
          </ExerciseItem>
          <ExerciseItem>
            <span>합격</span>
            <span>{passedItems}개</span>
          </ExerciseItem>
          <ExerciseItem>
            <span>불합격</span>
            <span>{failedItems}개</span>
          </ExerciseItem>
        </ExerciseInfo>
      </Wrapper>
    </Container>
  );
};

export default DoctorCheckHW;
