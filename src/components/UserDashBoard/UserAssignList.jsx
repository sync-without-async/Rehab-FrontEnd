import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import BlockContainer from "../Common/BlockContainer.jsx";
import TitleText from "../Common/TitleText.jsx";
import Callout from "../Common/Callout.jsx";
import { useMemo } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import Table from "../Common/Table.jsx";

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

const data = [];

for (let i = 1; i <= 10; i++) {
  let score;

  if (Math.random() < 0.5) {
    score = 0;
  } else {
    score = Math.floor(Math.random() * 800) / 1000 + 0.2;
  }
  data.push({
    pno: i,
    ord: i,
    title: "운동 이름 " + i,
    metrics: score,
  });
}

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
  const assignData = [
    ["번호", "과제 이름", "정확도", "판정", "수강"],
    ...data.map((item) => [
      item.ord,
      item.title,
      getMetricsDisplay(item.metrics),
      getGrade(item.metrics),
      <Icon key={item.ord} />,
    ]),
  ];

  return (
    <Container>
      <TitleText text="과제" small={true} />
      <Callout title="과제 설명" content="어쩌구 저쩌구~~~~~" />
      <Table
        template="60px 420px 90px 100px 50px"
        align={["right", "left", "right", "center", "center"]}
        data={assignData}
      />
    </Container>
  );
};

export default UserAssignList;
