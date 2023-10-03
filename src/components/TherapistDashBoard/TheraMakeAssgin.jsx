import styled from "styled-components";
import InputDText from "../Input/InputDText";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import IconDelete from "../../assets/icons/iconassignx.png";
import Pagination from "../Pagination/Pagination";

const Container = styled.div`
  width: 800px;
  height: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top: 10px;
  padding: 20px 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 20px;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin-bottom: 20px;
`;

const OpinionTitle = styled.p`
  color: #000000;
  font-size: 16px;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const OpinionContent = styled.div`
  width: 720px;
  height: 100px;
  background-color: #cccccc;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  color: #666666;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const SearchAndFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 720px;
`;

const SelectedExercisesContainer = styled.div`
  margin-top: 20px;
  border: 2px dashed #0064ff;
  min-height: 150px;
  padding: 20px;
  border-radius: 10px;
`;

const Table = styled.table`
  width: 300px;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  height: 40px;
  border-bottom: 1px solid #e1e1e1;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 10px 15px;
  &:first-child {
    width: 200px;
  }
  &:nth-child(2) {
    width: 150px;
  }
`;

const TableHeader = styled.th`
  background-color: #f3f3f3;
  height: 40px;
  border-bottom: 2px solid #d9d9d9;
  font-size: 14px;
  color: #666666;
  text-align: left;
  padding-left: 15px;
  &:first-child {
    width: 200px;
  }
  &:nth-child(2) {
    width: 150px;
  }
`;

const DeleteIcon = styled.div`
  width: 20px;
  height: 20px;
  background-image: url(${IconDelete});
  background-size: cover;
  cursor: pointer;
`;

const filterlist = ["팔 재활", "어깨 재활", "허벅지 재활", "무릎 재활"];
const TheraMakeAssign = () => {
  const [exercises, setExercises] = useState([
    { id: "1", title: "팔 재활 1", time: " 1분 30초" },
    { id: "2", title: "팔 재활 2", time: " 1분 15초" },
    { id: "3", title: "어깨 재활 3", time: " 2분 30초" },
    { id: "4", title: "다리 재활 4", time: " 3분 30초" },
    { id: "5", title: "무릎 재활 5", time: " 1분 30초" },
    { id: "6", title: "무릎 재활 6", time: " 1분 30초" },
    { id: "7", title: "무릎 재활 7", time: " 1분 30초" },
    { id: "8", title: "다리 재활 8", time: " 1분 30초" },
    { id: "9", title: "무릎 재활 9", time: " 1분 30초" },
    { id: "10", title: "팔 재활 10", time: " 1분 30초" },
    { id: "11", title: "어깨 재활 11", time: " 1분 30초" },
  ]);
  {
    /* 환자에게 새로 할당하는 영역 */
  }
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleDelete = (idToDelete) => {
    setSelectedExercises((prev) => prev.filter((exercise) => exercise.id !== idToDelete));
  };
  

  const handleChange = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === "exercises" &&
      destination.droppableId === "selectedExercises"
    ) {
      const selectedItem = exercises[source.index];
      setSelectedExercises((prev) => [
        ...prev,
        { ...selectedItem, id: `selected-${selectedItem.id}` },
      ]);
    } else if (
      source.droppableId === "exercises" &&
      destination.droppableId === "exercises"
    ) {
      const items = [...exercises];
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setExercises(items);
    } else if (
      source.droppableId === "selectedExercises" &&
      destination.droppableId === "selectedExercises"
    ) {
      const items = [...selectedExercises];
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setSelectedExercises(items);
    }
  };

  //페이지네이션 영역
  const totalItems = 40;
  const itemsPerPage = 8;

  const handlePageChange = (selectedPage) => {
    console.log("Selected page:", selectedPage);
  };

  return (
    <Container>
      <Title>과제 할당</Title>
      <Divider />
      <InputDText label="프로그램 설명 *" />
      <OpinionTitle>담당 전문의 재활 치료 소견서</OpinionTitle>
      <OpinionContent>
        이 환자는 특히 팔이 아프고 어쩌고 저쩌고 특히 이부분을 신경써서 과제를
        만들어주세요
      </OpinionContent>
      <Divider />
      <OpinionTitle>과제 리스트 지정하기</OpinionTitle>
      <SearchAndFilterContainer>
        <SearchBar />
        <DropdownFilter items={filterlist} />
      </SearchAndFilterContainer>
      <DragDropContext onDragEnd={handleChange}>
        {/* 전체 강의 목록 영역 */}
        <Droppable droppableId="exercises">
          {(provided) => (
            <Table ref={provided.innerRef} {...provided.droppableProps}>
              <thead>
                <TableRow>
                  <TableHeader>운동 이름</TableHeader>
                  <TableHeader>운동 시간</TableHeader>
                </TableRow>
              </thead>
              <tbody>
                {exercises.map(({ id, title, time }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <TableRow
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                      >
                        <TableCell>{title}</TableCell>
                        <TableCell>{time}</TableCell>
                      </TableRow>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            </Table>
          )}
        </Droppable>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onChange={handlePageChange}
        />

        {/* 환자에게 새로 할당하는 영역 */}
        <SelectedExercisesContainer>
          <Droppable droppableId="selectedExercises">
            {(provided) => (
              <Table ref={provided.innerRef} {...provided.droppableProps}>
                <thead>
                  <TableRow>
                    <TableHeader>운동 이름</TableHeader>
                    <TableHeader>운동 시간</TableHeader>
                    <TableHeader>삭제</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {selectedExercises.map(({ id, title, time }, index) => (
                    <Draggable
                      key={id}
                      draggableId={`selected-${id}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <TableRow
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            background: snapshot.isDragging
                              ? "#e0e0e0"
                              : "transparent",
                            boxShadow: snapshot.isDragging
                              ? "0px 0px 8px rgba(0, 0, 0, 0.2)"
                              : "none",
                          }}
                        >
                          <TableCell>{title}</TableCell>
                          <TableCell>{time}</TableCell>
                          <TableCell>
                            <DeleteIcon onClick={() => handleDelete(id)} />
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </tbody>
              </Table>
            )}
          </Droppable>
        </SelectedExercisesContainer>
      </DragDropContext>
    </Container>
  );
};

export default TheraMakeAssign;
