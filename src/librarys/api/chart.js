import { getSpringAxios } from "./axios";

export async function registerChart(data, token) {
  const axios = getSpringAxios(token); 

  const response = await axios.post("/chart/auth/register", data);
  return response.data;
}
