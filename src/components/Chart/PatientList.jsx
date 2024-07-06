import styled from "styled-components";
import player from "../../assets/icons/player.png";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect, useReducer, useMemo } from "react";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import BlockContainer from "../Common/BlockContainer.jsx";
import {
  chartListReducer,
  intialChartListState,
} from "../../reducer/chart-list.js";
import TitleText from "../Common/TitleText.jsx";
import Table from "../Common/Table.jsx";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectId, selectRole, selectToken } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";
import { MdArrowForwardIos } from "react-icons/md";
import { ReducerContext } from "../../reducer/context.js";
import { getChartList } from "../../librarys/api/chart.js";
import { useNavigate } from "react-router";
import { getDisplayBirthday } from "../../librarys/util.js";
import Empty from "../Common/Empty.jsx";
import Conditional from "../Common/Conditional.jsx";

const Container = styled(BlockContainer)`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
`;

const Icon = styled(MdArrowForwardIos)`
  margin-top: 3px;
  width: 18px;
  height: 18px;
  color: #667080;

  cursor: pointer;
`;

const filters = [
  {
    key: "newest",
    value: "최신순",
  },
  {
    key: "oldest",
    value: "오래된순",
  },
];

function getDisplayPercentage(metrics) {
  return Math.round(metrics * 1000) / 10 + "%";
}

function getDisplayDate(date) {
  return dayjs(date).format("YYYY/MM/DD");
}

const headerButtons = [
  {
    text: "차트 생성",
    to: "/chart/create",
  },
];

const PatientList = () => {
  const navigate = useNavigate();
  const role = useSelector(selectRole);
  const [state, dispatch] = useReducer(chartListReducer, intialChartListState);
  const { list, sort, query } = state;

  const token = useSelector(selectToken);
  const id = useSelector(selectId);

  const handleSortSelect = (item) => {
    dispatch({
      type: "sort",
      payload: item?.key,
    });
  };

  const handleClick = (data, index) => {
    navigate("/chart/" + list[index].id);
  };

  const [roleText, roleKey] = useMemo(() => {
    if (role === ROLE_TYPE.DOCTOR) {
      return ["재활치료사", "therapist_name"];
    } else if (role === ROLE_TYPE.THERAPIST) {
      return ["전문의", "doctor_name"];
    } else {
      return ["", ""];
    }
  }, [role]);

  const chartData = useMemo(
    () => [
      ["환자 이름", "생년월일", "담당 " + roleText, "다음 외래 일정", "차트"],
      ...list.map((item) => [
        item.name,
        getDisplayBirthday(item.birthday),
        item[roleKey],
        getDisplayDate(item.medicalRecords[0].date),
        <Icon key={item.id} />,
      ]),
    ],
    [list, roleText, roleKey],
  );

  useEffect(() => {
    (async () => {
      const response = await getChartList({ token, id, sort, query });

      dispatch({
        type: "data",
        payload: response,
      });
    })();
  }, [id, token, sort, query]);

  const buttons = role === ROLE_TYPE.DOCTOR ? headerButtons : [];

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <Container>
        <TitleText text="환자 목록" buttons={buttons} />
        <SearchAndFilterContainer>
          <SearchBar placeholder="환자 이름으로 검색..." />
          <DropdownFilter
            items={filters}
            defaultText="정렬 선택"
            onSelect={handleSortSelect}
          />
        </SearchAndFilterContainer>
        <Table
          template="100px 220px 120px 230px 50px"
          align={["center", "center", "center", "center", "center"]}
          data={chartData}
          onClick={handleClick}
        />
        <Conditional
          condition={list.length === 0}
          content={<Empty message="환자 목록에 표시할 항목이 없습니다." />}
        />
        <Pagination />
      </Container>
    </ReducerContext.Provider>
  );
};

export default PatientList;
