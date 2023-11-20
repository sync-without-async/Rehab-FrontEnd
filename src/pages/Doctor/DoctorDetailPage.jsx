import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import DoctorDetailHeader from "../../components/DoctorDashBoard/DoctorDetailHeader";
import DoctorDetailChart from "../../components/DoctorDashBoard/DoctorDetailChart";
import DoctorCheckHW from "../../components/DoctorDashBoard/DoctorCheckHW";
import PageContainer from "../../components/Common/PageContainer.jsx";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useMemo, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../../redux/userSlice.js";
import { useParams } from "react-router";
import { getChart, getChartAiRecord } from "../../librarys/api/chart.js";
import {
  chartDetailReducer,
  intialChartDetailState,
} from "../../reducer/chart-detail.js";
import { getUserPrograms } from "../../librarys/api/program.js";
import DoctorRecord from "../../components/DoctorDashBoard/DoctorRecord.jsx";
import dayjs from "dayjs";
import DoctorCreateModal from "../../components/DoctorDashBoard/DoctorCreateModal.jsx";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const Grid = styled.div`
  height: 200px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const DoctorDetailPage = () => {
  const { id } = useParams();
  const token = useSelector(selectToken);

  const [state, dispatch] = useReducer(
    chartDetailReducer,
    intialChartDetailState,
  );

  const { medicalRecords, summaryRecords } = state;

  const mediacalData = useMemo(
    () =>
      medicalRecords.map((item) => ({
        date: dayjs(item.date).format("YYYY/MM/DD"),
        content: item.treatmentRecord,
      })),
    [medicalRecords],
  );

  const summaryData = useMemo(
    () =>
      summaryRecords.map((item) => ({
        date: dayjs(item.date).format("YYYY/MM/DD"),
        content: item.summary,
      })),
    [summaryRecords],
  );

  useEffect(() => {
    (async () => {
      const chartResponse = await getChart(token, id);
      const patientId = chartResponse.account_id;

      const assignmentResponse = await getUserPrograms(token, patientId);
      const aiSummaryResponse = await getChartAiRecord(token, patientId);

      dispatch({
        type: "data",
        payload: chartResponse,
      });

      dispatch({
        type: "metrics",
        payload: assignmentResponse.list.map((item) => item.metrics),
      });

      dispatch({
        type: "summaryRecords",
        payload: aiSummaryResponse,
      });
    })();
  }, []);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <DoctorCreateModal />
      <PageContainer>
        <BackButton text="환자 목록으로 돌아가기" to="/chart" />
        <Wrapper>
          <DoctorDetailHeader />
          <Grid>
            <DoctorDetailChart />
            <DoctorCheckHW />
          </Grid>
          <DoctorRecord title="외래 진료 기록" data={mediacalData} button />
          <DoctorRecord title="비대면 진료 기록" data={summaryData} />
        </Wrapper>
      </PageContainer>
    </ReducerContext.Provider>
  );
};

export default DoctorDetailPage;
