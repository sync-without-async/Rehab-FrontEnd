import { getSpringAxios } from "./axios";

export async function userLogin(id, password) {
  const axios = getSpringAxios();

  const body = {
    id,
    password,
  };

  const response = await axios.post("/login", body);
  return response.data;
}
