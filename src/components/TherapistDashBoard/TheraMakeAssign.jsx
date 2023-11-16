import styled from "styled-components";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import { DragDropContext } from "react-beautiful-dnd";
import { useEffect, useMemo, useReducer, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { ReducerContext } from "../../reducer/context.js";
import BlockContainer from "../Common/BlockContainer.jsx";
import { useNavigate, useParams } from "react-router-dom";
import {
  intialprogramAssignState,
  programAssignReducer,
} from "../../reducer/program-assign.js";
import TitleText from "../Common/TitleText.jsx";
import InputAreaContainer from "../Input/InputAreaContainer.jsx";
import { CATEGORY_LIST } from "../../librarys/type.js";
import { IoClose } from "react-icons/io5";
import Button from "../Button/Button.jsx";
import { getVideoList } from "../../librarys/api/video.js";
import DnDList from "../Common/DnDList.jsx";
import { modifyProgram } from "../../librarys/api/program.js";
import { useSelector } from "react-redux";
import { selectId } from "../../redux/userSlice.js";

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
  display: grid;
  grid-template-columns: 300px 350px;
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

const ButtonContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const filters = CATEGORY_LIST.map((item) => item);

const TheraMakeAssign = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    programAssignReducer,
    intialprogramAssignState,
  );
  const { id } = useParams();
  const adminId = useSelector(selectId);

  const {
    programList,
    assignList,
    assignDescription,
    doctorDescription,
    query,
    tag,
    page,
  } = state;

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

  const handleSubmit = async () => {
    if (assignDescription === "" || assignDescription.length < 4) {
      alert("과제 설명을 4자 이상 적어주세요.");
      return;
    }

    if (assignList === null || assignList.length < 1) {
      alert("환자에게 운동을 할당해주세요!");
      return;
    }

    console.log(assignList);

    const response = await modifyProgram({
      adminId,
      userId: id,
      description: assignDescription,
      list: assignList.map((item) => item.vno),
    });

    console.log(response);

    alert("과제 할당이 완료되었습니다.");

    navigate("/");
  };

  const handleDragEnd = (event) => {
    console.log(event);
    if (event.destination === null) {
      return;
    }

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
      const data = await getVideoList({ page, query, tag });

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
              <DnDList
                id="program-table"
                data={programList}
                dropping={false}
                dragging={true}
                removable={false}
              />
              <PaginationElement />
            </TableContainer>
            <TableContainer>
              <Text>환자에게 할당된 과제</Text>
              <DnDList
                id="assign-table"
                data={assignList}
                dropping={true}
                dragging={true}
                removable={true}
              />
            </TableContainer>
          </DragDropContext>
        </RowContainer>
        <ButtonContainer>
          <Button type="primary" onClick={handleSubmit}>
            과제 할당
          </Button>
        </ButtonContainer>
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default TheraMakeAssign;
