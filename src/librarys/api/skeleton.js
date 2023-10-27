import { getAIAxios } from "./axios.js";

const axios = getAIAxios();

export async function getSkeletons(formData) {
  const response = await axios.post("/videoRegister", formData);
  return response.data;
}

export async function getMetrics(formData) {
  const response = await axios.post("/getMetricsConsumer", formData);
  return response.data;
}
