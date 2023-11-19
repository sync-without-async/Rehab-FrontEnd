import styled from "styled-components";
import BackButton from "../../components/Button/BackButton";
import DoctorDetailHeader from "../../components/DoctorDashBoard/DoctorDetailHeader";
import DoctorDetailChart from "../../components/DoctorDashBoard/DoctorDetailChart";
import DoctorCheckHW from "../../components/DoctorDashBoard/DoctorCheckHW";
import DoctorUntactRecord from "../../components/DoctorDashBoard/DoctorUntactRecord";
import DoctorFaceRecord from "../../components/DoctorDashBoard/DoctorFaceRecord";
import PageContainer from "../../components/Common/PageContainer.jsx";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectId, selectToken } from "../../redux/userSlice.js";
import { useParams } from "react-router";
import { getChart } from "../../librarys/api/chart.js";
import {
  chartDetailReducer,
  intialChartDetailState,
} from "../../reducer/chart-detail.js";
import { getUserPrograms } from "../../librarys/api/program.js";

const Grid = styled.div`
  height: 200px;
  margin: 20px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const DoctorDetailPage = () => {
  const { id } = useParams();
  const adminId = useSelector(selectId);
  const token = useSelector(selectToken);

  const [state, dispatch] = useReducer(
    chartDetailReducer,
    intialChartDetailState,
  );

  useEffect(() => {
    (async () => {
      const chartResponse = await getChart(token, id);
      try {
        const assignmentResponse = await getUserPrograms(
          token,
          chartResponse.account_id,
        );

        dispatch({
          type: "metrics",
          payload: assignmentResponse.list.map((item) => item.metrics),
        });
      } catch (e) {}

      dispatch({
        type: "data",
        payload: chartResponse,
      });
    })();
  }, []);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <PageContainer>
        <BackButton text="환자 목록으로 돌아가기" to="/chart" />
        <DoctorDetailHeader />
        <Grid>
          <DoctorDetailChart />
          <DoctorCheckHW />
        </Grid>
        <DoctorFaceRecord />
        <DoctorUntactRecord />
      </PageContainer>
    </ReducerContext.Provider>
  );
};

export default DoctorDetailPage;
