import dayjs from "dayjs";

function getDate(date = null) {
  if (date === null) {
    date = dayjs();
  } else if (Array.isArray(date)) {
    date = dayjs(date);
  }
  return { year: date.get("y"), month: date.get("M"), date: date.get("D") };
}

function nextMonthState(state) {
  const date = dayjs([state.year, state.month, state.date]).add(1, "M");
  return getDate(date);
}

function prevMonthState(state) {
  const date = dayjs([state.year, state.month, state.date]).subtract(1, "M");
  return getDate(date);
}

export const intialReserveCreateState = {
  ...getDate(),
  disabledTime: [],
  index: null,
  description: "",
};

export function reserveCreateReducer(state, action) {
  switch (action.type) {
    case "prevMonth":
      return {
        ...state,
        ...prevMonthState(state),
        date: 1,
        index: null,
      };
    case "nextMonth":
      return {
        ...state,
        ...nextMonthState(state),
        date: 1,
        index: null,
      };
    case "date":
      return {
        ...state,
        date: action.payload,
        index: null,
      };
    case "disabledTime":
      return {
        ...state,
        disabledTime: action.payload,
      };
    case "index":
      return {
        ...state,
        index: action.payload,
      };
    case "description":
      return {
        ...state,
        description: action.payload,
      };
    default:
      console.error("[ReserveListReducer] Undefined action: " + action.type);
      return state;
  }
}
