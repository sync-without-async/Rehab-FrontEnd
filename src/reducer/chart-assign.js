export const intialprogramAssignState = {
  programList: [],
  assignList: [],
  assignDescription: "",
  doctorDescription: "",
  query: "",
  tag: null,
  page: 1,
  totalPage: 1,
};

export function programAssignReducer(state, action) {
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
    case "tag":
      return {
        ...state,
        tag: action.payload,
      };
    case "assignDescription":
      return {
        ...state,
        assignDescription: action.payload,
      };
    case "doctorDescription":
      return {
        ...state,
        doctorDescription: action.payload,
      };
    case "assignList":
      return {
        ...state,
        assignList: action.payload,
      };
    case "removeAssign":
      return {
        ...state,
        assignList: state.assignList.filter(
          (item, index) => index !== action.payload,
        ),
      };
    case "insertAssign":
      return {
        ...state,
        assignList: [
          ...state.assignList.splice(0, action.payload.index),
          action.payload.item,
          ...state.assignList,
        ],
      };
    case "data":
      return {
        ...state,
        programList: action.payload.dtoList || [],
        page: action.payload.page || 1,
        totalPage: action.payload.end || 1,
      };
    default:
      console.error("[ProgramAssignReducer] Undefined action: " + action.type);
      return state;
  }
}
