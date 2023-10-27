import { CATEGORY_TYPE } from "../librarys/type.js";

export const intialUploadState = {
  title: "",
  description: "",
  category: CATEGORY_TYPE[0].key,
  video: null,
  duration: null,
  skeleton: null,
};

export function uploadReducer(state, action) {
  switch (action.type) {
    case "title":
      return {
        ...state,
        title: action.payload,
      };
    case "description":
      return {
        ...state,
        description: action.payload,
      };
    case "category":
      return {
        ...state,
        category: action.payload,
      };
    case "video":
      return {
        ...state,
        video: action.payload,
      };
    case "duration":
      return {
        ...state,
        duration: action.payload,
      };
    case "skeleton":
      return {
        ...state,
        skeleton: action.payload,
      };
    default:
      console.error("[UploadReducer] Undefined action: " + action.type);
      return state;
  }
}
