import { getAIAxios } from "./axios.js";

import skeletons from "../assets/dummy_skeletons.json";
import { sleep } from "./util.js";

const axios = getAIAxios();

export async function getSkeletons(formData) {
  const response = await axios.post("/videoRegister", formData);
  // await sleep(3000);
  // return skeletons;
  return response.data;
}

export async function getMetrics(formData) {
  const response = await axios.post("/getMetricsConsumer", formData);
  return response.data;
}
