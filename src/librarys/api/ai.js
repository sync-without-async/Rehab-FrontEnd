import { createFormData, getAIAxios, getSpringAxios } from "./axios.js";

const axios = getAIAxios();

export async function getSkeletons(formData) {
  const response = await axios.post("/videoRegister", formData);
  return response.data;
}

export async function getMetrics(formData) {
  const response = await axios.post("/getMetricsConsumer", formData);
  return response.data;
}

export async function createMeetingResult(req) {
  const axios = getSpringAxios();

  const body = {
    audio: req.audio,
    uuid: req.uuid,
    id: req.id,
  };

  const response = await axios.post("/audio", createFormData(body));

  const data = {
    status: true,
    message: response.data,
  };

  return data;
}
