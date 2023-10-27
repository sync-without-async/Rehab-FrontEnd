export const intialModalState = {
  status: null,
  props: null,
};

export function modalReducer(state, action) {
  switch (action.type) {
    case "show":
      if (typeof action.payload === "string") {
        return {
          ...state,
          status: action.payload,
          props: null,
        };
      } else {
        return {
          ...state,
          status: action.payload.id,
          props: action.payload.props,
        };
      }
    case "hide":
      return {
        ...state,
        status: null,
        props: null,
      };
    default:
      console.error("[ModalReducer] Undefined action: " + action.type);
      return state;
  }
}
