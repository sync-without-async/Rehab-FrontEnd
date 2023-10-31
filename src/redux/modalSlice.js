import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    list: [],
  },
  reducers: {
    show: (state, action) => {
      if (typeof action.payload === "string") {
        state.list.push({
          id: action.payload,
          props: null,
        });
      } else {
        state.list.push({
          id: action.payload.id,
          props: action.payload.props,
        });
      }
    },
    hide: (state, action) => {
      state.list = state.list.filter((item) => item.id !== action.payload);
    },
  },
});

export const { show, hide } = modalSlice.actions;

export const selectVisible = (item) => (state) =>
  state.modal.list.find((element) => element.id === item) !== undefined;

export const selectProps = (item) => (state) =>
  state.modal.list.find((element) => element.id === item)?.props;

export const selectCount = (state) => state.modal.list.length;

export default modalSlice.reducer;
