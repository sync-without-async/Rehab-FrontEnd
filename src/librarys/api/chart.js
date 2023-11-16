import { getSpringAxios } from "./axios";

export async function registerChart(data, token) {
  const axios = getSpringAxios(token);

  const response = await axios.post("/chart/auth/register", data);
  return response.data;
}

export async function getTherapistList(token) {
  const axios = getSpringAxios(token);

  const response = await axios.get("/auth/getTherapistList");
  return response.data;
}