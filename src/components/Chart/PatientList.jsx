import styled from "styled-components";
import player from "../../assets/icons/player.png";
import Pagination from "../Pagination/Pagination";
import { useState, useEffect, useReducer, useMemo } from "react";
import { userLogin, getUserExercises } from "../../librarys/dummy-api";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import BlockContainer from "../Common/BlockContainer.jsx";
import { chartListReducer, intialChartListState } from "../../reducer/chart.js";
import TitleText from "../Common/TitleText.jsx";
import Table from "../Common/Table.jsx";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { selectRole } from "../../redux/userSlice.js";
import { ROLE_TYPE } from "../../librarys/type.js";
import { MdArrowForwardIos } from "react-icons/md";
import { ReducerContext } from "../../reducer/context.js";

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
    key: "NEWEST",
    value: "최신순",
  },
  {
    key: "OLDEST",
    value: "오래된순",
  },
  {
    key: "PERCENT",
    value: "수행도순",
  },
];

function getDisplayBirthday(birthday) {
  const date = dayjs(birthday);
  const displayDate = date.format("YYYY/MM/DD");
  const currentYear = dayjs().get("year");
  const patientYear = date.get("year");
  let age = currentYear - patientYear;

  if (date.set("year", currentYear).isAfter(dayjs())) {
    age--;
  }

  return `${displayDate} (${age}세)`;
}

function getDisplayPercentage(metrics) {
  return Math.round(metrics * 1000) / 10 + "%";
}

function getDisplayDate(date) {
  return dayjs(date).format("YYYY/MM/DD");
}

const PatientList = () => {
  const role = useSelector(selectRole);
  const [state, dispatch] = useReducer(chartListReducer, intialChartListState);
  const { list } = state;

  const handleSortSelect = (item) => {
    dispatch({
      type: "sort",
      payload: item?.key,
    });
  };

  const [roleText, roleKey] = useMemo(() => {
    if (role === ROLE_TYPE.DOCTOR) {
      return ["재활치료사", "therapist"];
    } else if (role === ROLE_TYPE.THERAPIST) {
      return ["전문의", "doctor"];
    } else {
      return ["", ""];
    }
  }, [role]);

  const chartData = useMemo(
    () => [
      [
        "환자 이름",
        "생년월일",
        "과제 수행도",
        "담당 " + roleText,
        "다음 외래 일정",
        "차트",
      ],
      ...list.map((item) => [
        item.name,
        getDisplayBirthday(item.birthday),
        getDisplayPercentage(item.metrics),
        item[roleKey],
        getDisplayDate(item.nextDate),
        <Icon key={item.id} />,
      ]),
    ],
    [list, roleText, roleKey],
  );

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <Container>
        <TitleText text="환자 목록" />
        <SearchAndFilterContainer>
          <SearchBar placeholder="환자 이름으로 검색..." />
          <DropdownFilter
            items={filters}
            defaultText="정렬 선택"
            onSelect={handleSortSelect}
          />
        </SearchAndFilterContainer>
        <Table
          template="100px 220px 100px 120px 130px 50px"
          align={["center", "center", "center", "center", "center", "center"]}
          data={chartData}
        />
        <Pagination />
      </Container>
    </ReducerContext.Provider>
  );
};

export default PatientList;
