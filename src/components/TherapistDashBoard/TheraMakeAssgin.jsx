import styled from "styled-components";
import InputDText from "../Input/InputDText";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {useState} from "react";

const Container = styled.div`
  width: 800px;
  height: 1200px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #0064ff;
  border-radius: 10px;
  background-color: #ffffff;
  font-family: "Spoqa Han Sans Neo", "sans-serif";
  margin-top:10px;
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
  background-color: #CCCCCC;
  border: 1px solid #BBBBBB;
  border-radius: 10px;
  color: #666666;
  font-size: 14px;
  padding: 10px;
  display: flex;
  align-items: center;  
  justify-content: center;
  margin-bottom:40px;
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
  {/* 환자에게 새로 할당하는 영역 */}
  const [selectedExercises, setSelectedExercises] = useState([]);

  const handleChange = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === "exercises" && destination.droppableId === "selectedExercises") {
        setSelectedExercises(prev => [...prev, exercises[source.index]]);
    } 
    else if (source.droppableId === "exercises" && destination.droppableId === "exercises") {
        const items = [...exercises];
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setExercises(items);
    }
    else if (source.droppableId === "selectedExercises" && destination.droppableId === "selectedExercises") {
        const items = [...selectedExercises];
        const [reorderedItem] = items.splice(source.index, 1);
        items.splice(destination.index, 0, reorderedItem);
        setSelectedExercises(items);
    }
};



  return (
    <Container>
      <Title>과제 할당</Title>
      <Divider />
      <InputDText label="프로그램 설명 *" />
      <OpinionTitle>담당 전문의 재활 치료 소견서</OpinionTitle>
      <OpinionContent>
        이 환자는 특히 팔이 아프고 어쩌고 저쩌고 특히 이부분을 신경써서 과제를 만들어주세요
      </OpinionContent>
      <Divider />
      <OpinionTitle>과제 리스트 지정하기</OpinionTitle>
      <SearchAndFilterContainer>
        <SearchBar />
        <DropdownFilter items={filterlist} />
      </SearchAndFilterContainer>
      
      <DragDropContext onDragEnd={handleChange}>
      <Droppable droppableId="exercises">
        {(provided) => (
          <ul
            className="exercises"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {exercises.map(({ id, title, time }, index) => (
              <Draggable key={id} draggableId={id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                  >
                    {title}{time}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <SelectedExercisesContainer>
      <Droppable droppableId="selectedExercises">
          {(provided) => (
            <ul
              className="selectedExercises"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {selectedExercises.map(({ id, title, time }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                    >
                      {title}{time}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
        </SelectedExercisesContainer>
      </DragDropContext>
    </Container>
  );
};

export default TheraMakeAssign;
