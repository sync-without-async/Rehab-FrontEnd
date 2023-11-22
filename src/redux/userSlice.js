import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ROLE_TYPE } from "../librarys/type.js";
import {
  getUserToken,
  getStaffInfo,
  getPatientInfo,
  getPatientStaffInfo,
} from "../librarys/api/user.js";
import { getPatientDate } from "../librarys/api/chart.js";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "user/login",
  async ({ id, password }, thunkAPI) => {
    const response = await getUserToken(id, password);
    return { ...response, id };
  },
);

export const getMyInfo = createAsyncThunk(
  "user/getMyInfo",
  async ({ id, role, accessToken }, thunkAPI) => {
    if (role === ROLE_TYPE.USER) {
      const info = await getPatientInfo(accessToken, id);
      const staff = await getPatientStaffInfo(accessToken, id);
      const chart = await getPatientDate(accessToken, id);
      return { ...info, ...staff, ...chart };
    } else if ([ROLE_TYPE.DOCTOR, ROLE_TYPE.THERAPIST].includes(role)) {
      return await getStaffInfo(accessToken, id);
    }
    return {};
  },
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    accessToken: Cookies.get("accessToken") || null,
    refreshToken: Cookies.get("refreshToken") || null,
    id: Cookies.get("id") || null,
    name: null,
    role: Cookies.get("role") || ROLE_TYPE.VISITOR,
    location: null,
    department: null,
    image: null,
    doctor: null,
    therapist: null,
    recentVisitDate: null,
    nextScheduleDate: null,
  },
  reducers: {
    tempLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.accessToken;
      state.id = action.payload.id;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.id = null;
      state.name = null;
      state.role = ROLE_TYPE.VISITOR;
      state.location = null;
      state.department = null;
      state.image = null;
      state.doctor = null;
      state.therapist = null;
      state.recentVisitDate = null;
      state.nextScheduleDate = null;

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("id");
      Cookies.remove("role");
    },
    loadTokens: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.role = action.payload.role;
      state.location = action.payload.location;
      state.department = action.payload.department;
      state.image = action.payload.image;
      state.doctor = action.payload.doctor;
      state.therapist = action.payload.therapist;
      state.recentVisitDate = action.payload.recentVisitDate;
      state.nextScheduleDate = action.payload.nextScheduleDate;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.id = action.payload.id;
      state.role = action.payload.role;

      Cookies.set("accessToken", action.payload.accessToken, { expires: 1 });
      Cookies.set("refreshToken", action.payload.refreshToken, { expires: 1 });
      Cookies.set("id", action.payload.id, { expires: 1 });
      Cookies.set("role", action.payload.role, { expires: 1 });
    });

    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      if (action.payload.role === ROLE_TYPE.USER) {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.phone = action.payload.phone;
        state.role = action.payload.role;
        state.doctor = action.payload.doctor;
        state.therapist = action.payload.therapist;
        state.recentVisitDate = action.payload.recentVisitDate;
        state.nextScheduleDate = action.payload.nextScheduleDate;
      } else {
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.role = action.payload.role;
        state.location = action.payload.location;
        state.department = action.payload.department;
        state.image = action.payload.image;
      }
    });
  },
});

export const { tempLogin, loadTokens, logout } = userSlice.actions;

export const selectToken = (state) => state.user.accessToken;
export const selectRefreshToken = (state) => state.user.refreshToken;
export const selectId = (state) => state.user.id;
export const selectName = (state) => state.user.name;
export const selectImage = (state) => state.user.image;
export const selectRole = (state) => state.user.role;
export const selectLocation = (state) => state.user.location;
export const selectDepartment = (state) => state.user.department;
export const selectDoctor = (state) => state.user.doctor;
export const selectTherapist = (state) => state.user.therapist;
export const selectRecentVisitDate = (state) => state.user.recentVisitDate;
export const selectNextScheduleDate = (state) => state.user.nextScheduleDate;
export const selectIsLoggedIn = (state) => state.user.accessToken !== null;

export default userSlice.reducer;
