import { getSpringAxios } from "./axios";

export async function userSignup(formData) {
  const axios = getSpringAxios();

  const response = await axios.post("/join", formData);
  return response.data;
}