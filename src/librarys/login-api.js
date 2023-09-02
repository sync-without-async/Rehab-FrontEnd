import axios from "./axios.js";
import { decodeJWT } from "./util.js";
import Cookies from "js-cookie";

export async function userLogin(mid, password) {
  const data = {
    mid,
    password,
  };

  const response = await axios.post("/login", data);

  return response;
}

export async function userRefreshToken(accessToken, refreshToken) {
  const data = {
    accessToken,
    refreshToken,
  };

  const response = await axios.post("/refreshToken", data);

  return response;
}

export async function userRegister(mid, password, name, age, sex, phone) {
  const data = {
    mid,
    password,
    name,
    age,
    sex,
    phone,
  };

  const response = await axios.post("/user/join", data);

  return response;
}

export function saveToken(data) {
  const payload = decodeJWT(data.accessToken);
  const refreshPayload = decodeJWT(data.refreshToken);

  payload.exp *= 1000;
  refreshPayload.exp *= 1000;

  function setCookie(key, value, exp) {
    const additionalTime = 1000 * 60 * 24 * 7; // 7일

    Cookies.set(key, value, {
      expires: new Date(exp + additionalTime),
    });
  }

  setCookie("accessToken", data.accessToken, payload.exp);
  setCookie("accessTokenExpire", payload.exp, payload.exp);
  setCookie("refreshToken", data.refreshToken, refreshPayload.exp);
  setCookie("refreshTokenExpire", refreshPayload.exp, refreshPayload.exp);
  setCookie("userName", payload.mid, payload.exp);
  setCookie("userRole", payload.role, payload.exp);

  return {
    access_token: data.accessToken,
    refresh_token: data.refreshToken,
    email: payload.mid,
    name: payload.mid,
    admin: payload.role === "ROLE_ADMIN",
  };
}

export async function loadToken() {
  const accessToken = Cookies.get("accessToken");
  const refreshToken = Cookies.get("refreshToken");
  const accessTokenExpire = Number(Cookies.get("accessTokenExpire"));
  const refreshTokenExpire = Number(Cookies.get("refreshTokenExpire"));
  const name = Cookies.get("userName");
  const role = Cookies.get("userRole");

  if (!accessToken || !refreshToken) {
    // 비로그인 상태
    return null;
  }

  if (new Date(accessTokenExpire) < new Date()) {
    // 토큰이 만료됨

    if (new Date(refreshTokenExpire) < new Date()) {
      // 리프레시 토큰도 만료됨 - 비로그인 상태
      return null;
    }

    const response = await userRefreshToken(accessToken, refreshToken);
    return saveToken(response.data);
  }

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    email: name,
    name: name,
    admin: role === "ROLE_ADMIN",
  };
}

export function clearToken() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  Cookies.remove("accessTokenExpire");
  Cookies.remove("refreshTokenExpire");
  Cookies.remove("userName");
  Cookies.remove("userRole");
}

window.clearToken = clearToken;