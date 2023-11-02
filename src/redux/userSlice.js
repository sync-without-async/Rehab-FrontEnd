import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from "../librarys/dummy-api.js";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ id, password }, thunkAPI) => {
    const response = await userLogin(id, password);
    if (!response) {
      return thunkAPI.rejectWithValue("Login failed");
    }
    return response;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: null,
    refresh_token: null,
    email: null,
    name: null,
    role: null,
  },
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.email = null;
      state.name = null;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.access_token = action.payload.access_token;
        state.refresh_token = action.payload.refresh_token;
        state.email = action.payload.email;
        state.name = action.payload.name;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state) => {
        // 로그인 실패시 처리, 필요한 경우 상태 업데이트
      });
  },
});

export const { logout } = userSlice.actions;

export const selectName = (state) => state.user.name;
export const selectEmail = (state) => state.user.email;
export const selectIsLoggedIn = (state) => state.user.access_token !== null;
export const selectToken = (state) => state.user.name;
export const selectRole = (state) => state.user.role;

export default userSlice.reducer;
