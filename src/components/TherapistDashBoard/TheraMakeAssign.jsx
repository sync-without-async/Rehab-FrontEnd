import styled from "styled-components";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useMemo, useReducer, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { ReducerContext } from "../../reducer/context.js";
import BlockContainer from "../Common/BlockContainer.jsx";
import { useNavigate } from "react-router-dom";
import {
  intialprogramAssignState,
  programAssignReducer,
} from "../../reducer/program-assign.js";
import TitleText from "../Common/TitleText.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import { CATEGORY_LIST } from "../../librarys/type.js";
import Table from "../Common/Table.jsx";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { getVideoList } from "../../librarys/api/video.js";

const InputArea = styled(InputAreaContainer)`
  margin-top: 28px;
  width: 100%;
`;

const Divider = styled.div`
  width: 100%;
  margin: 28px 0;
  border-top: 1px solid #d9d9d9;
`;

const SearchAndFilterContainer = styled.div`
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
  align-self: flex-start;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PaginationElement = styled(Pagination)`
  margin-top: 16px;
`;

const Icon = styled(IoClose)`
  width: 24px;
  height: 24px;
  color: #667080;

  cursor: pointer;
`;

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const filters = CATEGORY_LIST.map((item) => item);

function getDisplayTime(time) {
  const min = Math.floor(time / 60);
  const sec = Math.round(time - min * 60);

  return [min, sec].map((item) => item.toString().padStart(2, "0")).join(":");
}

const TheraMakeAssign = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    programAssignReducer,
    intialprogramAssignState,
  );

  const {
    programList,
    assignList,
    assignDescription,
    doctorDescription,
    query,
    tag,
    page,
  } = state;

  const programData = useMemo(
    () => [
      ["운동 이름", "운동 길이"],
      ...programList.map((item) => [item.title, getDisplayTime(item.playTime)]),
    ],
    [programList],
  );

  const assignData = useMemo(
    () => [
      ["운동 이름", "운동 길이", "삭제"],
      ...assignList.map((item, index) => [
        item.title,
        getDisplayTime(item.playTime),
        <Icon key={index} onClick={() => handleRemoveClick(index)} />,
      ]),
    ],
    [assignList],
  );

  const handleAssignDescriptionChange = (event) => {
    dispatch({
      type: "assignDescription",
      payload: event.target.value,
    });
  };

  const handleTagSelect = (item) => {
    dispatch({
      type: "tag",
      payload: item?.key,
    });
  };

  const handleRemoveClick = (id) => {
    dispatch({
      type: "removeAssign",
      payload: id,
    });
  };

  const handleDragEnd = (event) => {
    console.log(event);

    if (event.destination === null) {
      return;
    }

    console.log(assignList);

    if (
      event.source.droppableId === "assign-table" &&
      event.destination.droppableId === "assign-table"
    ) {
      // 과제 테이블 Swap
      const list = Array.from(assignList);

      const [selected] = list.splice(event.source.index, 1);
      list.splice(event.destination.index, 0, selected);

      dispatch({
        type: "assignList",
        payload: list,
      });
    } else {
      // 과제 테이블 Insert
      const item = programList[event.source.index];

      dispatch({
        type: "insertAssign",
        payload: {
          index: event.destination.index,
          item,
        },
      });
    }
  };

  useEffect(() => {
    (async () => {
      // Fetch GET endpoint here
      // const res = await getUserAssignment(user_id);

      dispatch({
        type: "doctorDescription",
        payload: "테스트입니다~~~",
      });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getVideoList(page, query, tag);
      console.log(data);

      dispatch({
        type: "data",
        payload: data,
      });
    })();
  }, [page, query, tag]);

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <TitleText text="과제 할당" />
        <InputArea
          label="프로그램 설명 *"
          value={assignDescription}
          onChange={handleAssignDescriptionChange}
        />
        <InputArea
          label="담당 전문의 재활 치료 소견서"
          value={doctorDescription}
          disabled
        />
        <Divider />
        <Text>과제 리스트 지정하기</Text>
        <SearchAndFilterContainer>
          <SearchBar placeholder="운동 이름으로 검색..." />
          <DropdownFilter
            items={filters}
            defaultText="전체"
            onSelect={handleTagSelect}
          />
        </SearchAndFilterContainer>
        <RowContainer>
          <DragDropContext onDragEnd={handleDragEnd}>
            <TableContainer>
              <Text>전체 운동 목록</Text>
              <Table
                id="program-table"
                template="190px 110px"
                align={["left", "right"]}
                data={programData}
                dropping={false}
                dragging={true}
              />
              <PaginationElement />
            </TableContainer>
            <TableContainer>
              <Text>환자에게 할당된 과제</Text>
              <Table
                id="assign-table"
                template="190px 110px 50px"
                align={["left", "right", "center"]}
                data={assignData}
                dropping={true}
                dragging={true}
              />
            </TableContainer>
          </DragDropContext>
        </RowContainer>
        <ButtonContainer>
          <Button type="primary">과제 할당</Button>
        </ButtonContainer>
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default TheraMakeAssign;
