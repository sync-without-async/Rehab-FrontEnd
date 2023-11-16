import { getSpringAxios } from "./axios";

export async function registerChart(data) {
  const axios = getSpringAxios();

  const response = await axios.post("/chart/auth/register", data);
  return response.data;
}
