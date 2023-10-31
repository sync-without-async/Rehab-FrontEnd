export const intialVideoListState = {
  query: "",
  category: null,
  list: [],
  page: 1,
  totalPage: 1,
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
