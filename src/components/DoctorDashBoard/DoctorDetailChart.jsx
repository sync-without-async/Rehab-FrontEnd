import { useContext, useMemo } from "react";
import styled from "styled-components";
import { ReducerContext } from "../../reducer/context.js";
import TitleText from "../Common/TitleText.jsx";
import BlockContainer from "../Common/BlockContainer.jsx";

const Container = styled(BlockContainer)`
  width: 380px;
  color: #000000;
  padding: 8px 24px;
`;

const List = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  color: #000000;
  font-size: 16px;
`;

const Value = styled.span`
  color: #908b8b;
`;

const DoctorDetailChart = () => {
  const [state, dispatch] = useContext(ReducerContext);
  const { diseaseCode, medicalRecords, therapist_name } = state;

  const recentVisitDate = useMemo(() => {
    if (medicalRecords && medicalRecords.length > 0) {
      return medicalRecords[0].date;
    } else {
      return "-";
    }
  }, [medicalRecords]);

  const data = [
    {
      key: "질병 분류 번호",
      value: diseaseCode,
    },
    {
      key: "최근 외래 진료일",
      value: recentVisitDate,
    },
    {
      key: "다음 진료 예약일",
      value: null,
    },
    {
      key: "담당 재활 치료사",
      value: therapist_name,
    },
  ];

  return (
    <Container>
      <TitleText text="차트 정보" small />
      <List>
        {data.map((item, index) => (
          <Row key={index}>
            <Label>{item.key}</Label>
            <Value>{item.value || "-"}</Value>
          </Row>
        ))}
      </List>
    </Container>
  );
};

export default DoctorDetailChart;
