export const intialProgramListState = {
  list: [],
  page: 1,
  totalPage: 1,
  description: "",
};

export function programListReducer(state, action) {
  switch (action.type) {
    case "page":
      return {
        ...state,
        page: action.payload,
      };
    case "data":
      return {
        ...state,
        description: action.payload.description,
        list: action.payload.list || [],
        page: action.payload.page || 1,
        totalPage: action.payload.total || 1,
      };
    default:
      console.error("[ProgramListReducer] Undefined action: " + action.type);
      return state;
  }
}
