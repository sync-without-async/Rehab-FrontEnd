import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: null,
    refresh_token: null,
    email: null,
    name: null,
    admin: false,
  },

  reducers: {
    login: (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.admin = action.payload.admin;
    },
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.email = null;
      state.name = null;
      state.admin = false;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectName = (state) => state.user.name;
export const selectEmail = (state) => state.user.email;
export const selectIsLoggedIn = (state) => state.user.access_token !== null;
export const selectToken = (state) => state.user.access_token;
export const selectIsAdmin = (state) => state.user.admin;

export default userSlice.reducer;
