export const intialChartDetailState = {
  cno: null,
  diseaseCode: null,
  phone: null,
  gender: null,
  birthday: null,
  account_id: null,
  name: null,
  doctor_name: null,
  therapist_name: null,
  metrics: [],
  medicalRecords: [],
};

export function chartDetailReducer(state, action) {
  switch (action.type) {
    case "data":
      return {
        ...state,
        cno: action.payload.cno,
        diseaseCode: action.payload.diseaseCode,
        phone: action.payload.phone,
        gender: action.payload.gender,
        birthday: action.payload.birthday,
        account_id: action.payload.account_id,
        name: action.payload.name,
        doctor_name: action.payload.doctor_name,
        therapist_name: action.payload.therapist_name,
        medicalRecords: action.payload.medicalRecords,
      };
    case "metrics":
      return {
        ...state,
        metrics: action.payload,
      };
    default:
      console.error("[ChartDetailReducer] Undefined action: " + action.type);
      return state;
  }
}
