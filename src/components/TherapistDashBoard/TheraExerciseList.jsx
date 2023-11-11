import styled from "styled-components";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../Input/SearchBar";
import DropdownFilter from "../Dropdown/DropdownFilter";
import TheraSeveralExercise from "./TheraSeveralExercise";
import { CATEGORY_LIST } from "../../librarys/type.js";
import TitleText from "../Common/TitleText.jsx";
import BlockContainer from "../Common/BlockContainer.jsx";
import { ReducerContext } from "../../reducer/context.js";
import { useEffect, useReducer } from "react";
import {
  intialVideoListState,
  videoListReducer,
} from "../../reducer/video-list.js";
import { getVideoList } from "../../librarys/api/video.js";
import TheraExerciseModal from "./TheraExerciseModal.jsx";

const SearchAndFilterContainer = styled.div`
  margin-top: 28px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const filters = CATEGORY_LIST.map((item) => item);

const TheraExerciseList = () => {
  const [state, dispatch] = useReducer(videoListReducer, intialVideoListState);
  const { list, page, query, category } = state;

  useEffect(() => {
    (async () => {
      const data = await getVideoList(page, query, category);
      dispatch({
        type: "data",
        payload: data,
      });
    })();
  }, [page, query, category]);

  function onCategorySelect(item) {
    dispatch({
      type: "category",
      payload: item?.key,
    });
  }

  return (
    <ReducerContext.Provider value={[state, dispatch]}>
      <BlockContainer>
        <TheraExerciseModal />
        <TitleText text="운동 등록" />
        <SearchAndFilterContainer>
          <SearchBar placeholder="환자 이름으로 검색..." />
          <DropdownFilter
            items={filters}
            defaultText="전체"
            onSelect={onCategorySelect}
          />
        </SearchAndFilterContainer>
        <List>
          {list.map((item) => (
            <TheraSeveralExercise
              key={item.vno}
              id={item.vno}
              title={item.title}
              description={item.description}
              image={item.thumbnailURL}
              video={item.videoURL}
            />
          ))}
        </List>

        <Pagination />
      </BlockContainer>
    </ReducerContext.Provider>
  );
};

export default TheraExerciseList;
