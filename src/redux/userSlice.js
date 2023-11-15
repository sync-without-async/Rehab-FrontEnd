import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dummyLogin } from "../librarys/dummy-api.js";
import { userLogin } from "../librarys/api/login.js";
import { ROLE_TYPE } from "../librarys/type.js";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ id, password }, thunkAPI) => {
    const response = await dummyLogin(id, password);
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
    id: null,
    name: null,
    role: ROLE_TYPE.VISITOR,
    location: null,
    department: null,
    doctor: null,
    therapist: null,
  },
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.refresh_token = null;
      state.id = null;
      state.name = null;
      state.role = null;
      state.location = null;
      state.department = null;
      state.doctor = null;
      state.therapist = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.access_token = action.payload.access_token;
      state.refresh_token = action.payload.refresh_token;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.location = action.payload.location;
      state.department = action.payload.department;
    });
  },
});

export const { logout } = userSlice.actions;

export const selectToken = (state) => state.user.token;
export const selectRefreshToken = (state) => state.user.token;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectRole = (state) => state.user.role;
export const selectLocation = (state) => state.user.location;
export const selectDepartment = (state) => state.user.department;
export const selectDoctor = (state) => state.user.doctor;
export const selectTherapist = (state) => state.user.therapist;
export const selectIsLoggedIn = (state) => state.user.access_token !== null;

export default userSlice.reducer;
