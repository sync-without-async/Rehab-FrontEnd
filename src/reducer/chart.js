export const intialChartListState = {
  list: [],
  query: "",
  sort: null,
  page: 1,
  totalPage: 1,
};

export function chartListReducer(state, action) {
  switch (action.type) {
    case "page":
      return {
        ...state,
        page: action.payload,
      };
    case "query":
      return {
        ...state,
        query: action.payload,
      };
    case "sort":
      return {
        ...state,
        sort: action.payload,
      };
    case "data":
      return {
        ...state,
        list: action.payload.dtoList || [],
        page: action.payload.page || 1,
        totalPage: action.payload.end || 1,
      };
    default:
      console.error("[ChartListReducer] Undefined action: " + action.type);
      return state;
  }
}
