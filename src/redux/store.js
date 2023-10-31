import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import modalReducer from "../redux/modalSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export default store;
