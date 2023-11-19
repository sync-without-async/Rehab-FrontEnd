import { ROLE_LIST, ROLE_TYPE } from "../type.js";
import { getJwtPayload } from "../util.js";
import { SPRING_URL, getSpringAxios } from "./axios";

// get ~~
// create ~~
// modify ~~
// delete ~~

export async function getUserToken(mid, password) {
  const axios = getSpringAxios();

  const body = {
    mid,
    password,
  };

  const response = await axios.post("/login", body);

  const data = {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
    id: null,
    role: null,
    expire: null,
  };

  const payload = getJwtPayload(data.accessToken);

  const ROLE_CONVERT = {
    ROLE_PATIENT: ROLE_TYPE.USER,
    ROLE_DOCTOR: ROLE_TYPE.DOCTOR,
    ROLE_THERAPIST: ROLE_TYPE.THERAPIST,
  };

  data.id = payload.mid;
  data.role = ROLE_CONVERT[payload.role];
  data.expire = payload.exp;

  return data;
}

export async function getRefreshToken(accessToken, refreshToken) {
  const axios = getSpringAxios();

  const body = {
    accessToken,
    refreshToken,
  };

  const response = await axios.post("/refreshToken", body);

  const data = {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };

  return data;
}

export async function createAccount(req) {
  const axios = getSpringAxios();

  const body = {
    mid: req.id,
    name: req.name,
    password: req.password,
    hospital: req.hospital,
    department: req.department,
    email: req.email,
    phone: req.phone,
    staffRole: req.role,
    profileUrl: req.image,
  };

  const response = await axios.post("/join", body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function getStaffInfo(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/staff/info/" + id);

  const data = {
    id: response.data.mid,
    name: response.data.name,
    location: response.data.hospital,
    department: response.data.department,
    email: response.data.email,
    phone: response.data.phone,
    role: response.data.staffRole,
    image: response.data.fileName,
  };

  data.role = data.role && data.role.slice(1, -1);
  data.role = ROLE_TYPE[data.role];
  data.image = SPRING_URL + "view/" + data.image;

  return data;
}

export async function getPatientInfo(token, id) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/patient/info/" + id);

  const data = {
    id: response.data.mid,
    name: response.data.name,
    birthday: response.data.birth,
    gender: response.data.sex,
    phone: response.data.phone,
    role: ROLE_TYPE.USER,
  };

  return data;
}

export async function modifyPassword(token, mid, currentPassword, newPassword) {
  const axios = getSpringAxios(token);

  const body = {
    mid,
    currentPassword,
    newPassword,
  };

  const response = await axios.post("/auth/change-password", body);

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}

export async function getTherapistList(token) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/getTherapistList");

  const data = response.data.map((item) => ({
    mid: item.mid,
    name: item.name,
    location: item.location,
    department: item.department,
  }));

  return data;
}
