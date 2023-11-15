import { getSpringAxios } from "./axios";

export async function userSignup(data) {
  const axios = getSpringAxios();

  const response = await axios.post("/join", data);
  return response.data;
}
