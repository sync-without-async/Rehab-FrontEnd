export const intialUserRegisterState = {
  id: "",
  password: "",
  name: "",
  hospital: "",
  department: "",
  email: "",
  phone: "",
  image: "",
  role: "",
};

export function userRegisterReducer(state, action) {
  switch (action.type) {
    case "field":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      console.error("[UserRegisterReducer] Undefined action: " + action.type);
      return state;
  }
}
