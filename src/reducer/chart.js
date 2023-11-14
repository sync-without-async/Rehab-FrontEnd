export const intialChartListState = {
  list: [
    {
      id: "user11",
      name: "사용자1",
      birthday: "2003/02/12",
      metrics: 0.353,
      doctor: "전문의",
      therapist: "치료사",
      nextDate: "2023/11/18",
    },
    {
      id: "user12",
      name: "사용자2",
      birthday: "2003/05/22",
      metrics: 0.613,
      doctor: "전문의",
      therapist: "치료사",
      nextDate: "2023/11/17",
    },
    {
      id: "user13",
      name: "사용자3",
      birthday: "1996/11/08",
      metrics: 0.972,
      doctor: "전문의",
      therapist: "치료사",
      nextDate: "2023/11/20",
    },
  ],
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
