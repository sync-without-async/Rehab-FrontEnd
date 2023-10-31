import { CATEGORY_TYPE } from "../librarys/type.js";

export const intialVideoListState = {
  query: "",
  category: null,
  list: [],
  page: 1,
  totalItems: 80,
  itemsPerPage: 10,
};

export function videoListReducer(state, action) {
  switch (action.type) {
    case "query":
      return {
        ...state,
        query: action.payload,
      };
    case "category":
      return {
        ...state,
        category: action.payload,
      };
    case "page":
      return {
        ...state,
        page: action.payload,
      };
    case "data":
      return {
        ...state,
        list: action.payload.dtoList,
        page: action.payload.page,
        totalPage: action.payload.end,
      };
    default:
      console.error("[VideoListReducer] Undefined action: " + action.type);
      return state;
  }
}
