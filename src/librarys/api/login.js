import { getSpringAxios } from "./axios";

export async function userLogin(mid, password) {
  const axios = getSpringAxios();

  const body = {
    mid,
    password,
  };

  const response = await axios.post("/login", body);
  return response.data;
}
