import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ROLE_TYPE } from "../librarys/type.js";
import { getUserToken, getUserInfo } from "../librarys/api/user.js";

export const login = createAsyncThunk(
  "user/login",
  async ({ id, password }, thunkAPI) => {
    const response = await getUserToken(id, password);
    return { ...response, id };
  },
);

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async ({ id, accessToken }, thunkAPI) => {
    const response = await getUserInfo(accessToken, id);
    return response;
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    access_token: null,
    refresh_token: null,
    id: null,
    name: null,
    role: ROLE_TYPE.VISITOR,
    location: null,
    department: null,
    image: null,
    doctor: null,
    therapist: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.id = null;
      state.name = null;
      state.role = null;
      state.location = null;
      state.department = null;
      state.image = null;
      state.doctor = null;
      state.therapist = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.id = action.payload.id;
    });

    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.location = action.payload.location;
      state.department = action.payload.department;
      state.image = action.payload.image;
    });
  },
});

export const { logout } = userSlice.actions;

export const selectToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectRole = (state) => state.user.role;
export const selectLocation = (state) => state.user.location;
export const selectDepartment = (state) => state.user.department;
export const selectDoctor = (state) => state.user.doctor;
export const selectTherapist = (state) => state.user.therapist;
export const selectIsLoggedIn = (state) => state.user.accessToken !== null;

export default userSlice.reducer;
