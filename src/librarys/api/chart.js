import { getSpringAxios } from "./axios";

export async function registerChart(data, token) {
  const axios = getSpringAxios({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const response = await axios.post("/chart/auth/register", data);
  return response.data;
}
