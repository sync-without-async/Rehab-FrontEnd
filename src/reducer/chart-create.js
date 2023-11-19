export const intialChartCreateState = {
  diseaseCode: "",
  name: "",
  phone: "",
  gender: "",
  birthday: "",
  therapist: "",
  schedule: "",
  treatmentRecord: "",
  exerciseRequest: "",
  therapistList: [],
};

export function chartCreateReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      console.error("[ChartCreateReducer] Undefined action: " + action.type);
      return state;
  }
}
