import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import Callout from "../Common/Callout.jsx";
import { useEffect, useMemo, useReducer, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Table from "../Common/Table.jsx";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../redux/userSlice.js";
import { getUserPrograms } from "../../librarys/api/program.js";
import { ReducerContext } from "../../reducer/context.js";
import {
  intialProgramListState,
  programListReducer,
} from "../../reducer/program-list.js";

const Container = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Grade = styled.p`
  color: ${(props) => props.$color || "#666666"};
`;

const Icon = styled(MdArrowForwardIos)`
  margin-top: 3px;
  width: 18px;
  height: 18px;
  color: #667080;

  cursor: pointer;
`;

function getMetricsDisplay(value) {
  return Math.round(value * 1000) / 10 + "%";
}

function getGrade(value) {
  if (value === 0) {
    return <Grade>미수강</Grade>;
  } else if (value < 0.6) {
    return <Grade $color="#c71737">불합격</Grade>;
  } else {
    return <Grade $color="#0085ff">합격</Grade>;
  }
}

const UserAssignList = () => {
  const [state, dispatch] = useReducer(
    programListReducer,
    intialProgramListState,
  );
  const token = useSelector(selectToken);
  const id = useSelector(selectId);

  const { list, description } = state;

  const assignData = [
    ["번호", "과제 이름", "정확도", "판정", "수강"],
    ...list.map((item) => [
      item.ord,
      item.title,
      getMetricsDisplay(item.metrics),
      getGrade(item.metrics),
      <Icon key={item.ord} />,
    ]),
  ];

  useEffect(() => {
    (async () => {
      const response = await getUserPrograms(token, id);
      console.log(response);

      dispatch({
        type: "data",
        payload: response,
      });
    })();
  }, [id]);

  return (
    <Container>
      <TitleText text="과제" small={true} />
      <Callout title="과제 설명" content={description} />
      <Table
        template="60px 420px 90px 100px 50px"
        align={["right", "left", "right", "center", "center"]}
        data={assignData}
      />
    </Container>
  );
};

export default UserAssignList;
