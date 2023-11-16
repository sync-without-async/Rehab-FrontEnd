export const intialReservationListState = {
  list: [],
  page: 1,
  totalPage: 1,
};

export function reservationListReducer(state, action) {
  switch (action.type) {
    case "page":
      return {
        ...state,
        page: action.payload,
      };
    case "data":
      return {
        ...state,
        list: action.payload.list || [],
        page: action.payload.page || 1,
        totalPage: action.payload.end || 1,
      };
    default:
      console.error(
        "[ReservationListReducer] Undefined action: " + action.type,
      );
      return state;
  }
}
